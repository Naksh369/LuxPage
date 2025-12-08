"use client";

import Image from "next/image";
import "./welpage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default function Welcome() {
  // Refs
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const ballRef = useRef(null);
  const trailBallRef = useRef(null);

  // Mouse move handler
  const handleMouseMove = useCallback(
    throttle((e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      if (trailRef.current) {
        trailRef.current.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 300, fill: "forwards", easing: "ease-out" }
        );
      }
    }, 16),
    []
  );

  // Scroll parallax handler
  const handleScroll = useCallback(
    throttle(() => {
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    }, 50),
    []
  );
  const containerRef = useRef(null);

  // Setup GSAP and event listeners
useEffect(() => {
  AOS.init({ duration: 500, once: true });

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("scroll", handleScroll);

  cardsRef.current.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(card, { "--x": `${x}px`, "--y": `${y}px`, duration: 0.2 });
    });

    const blobs = containerRef.current.querySelectorAll(".blob");

    CustomEase.create(
      "drift",
      "M0,0 C0,0 0.122,0.215 0.139,0.276 0.145,0.299 0.179,0.853 0.187,0.868 0.194,0.878 0.519,0.927 0.549,0.946 0.699,1.043 0.589,0.202 0.754,0.132 0.904,0.069 0.787,0.902 0.925,0.559 0.93,0.545 0.939,0.67 0.945,0.683 0.952,0.699 0.96,0.729 0.965,0.751 0.977,0.807 1,1 1,1 "
    );

    // Smooth drifting function
    blobs.forEach((blob) => {
      const drift = () => {
        gsap.to(blob, {
          x: gsap.utils.random(-55, 55),
          y: gsap.utils.random(-55, 55),
          duration: gsap.utils.random(1.8, 7),
          ease: "drift",
          onComplete: drift
        });
      };

      drift();
    });

    CustomEase.create("soft", "M0,0 C0,0 0.015,0.156 0.021,0.226 0.033,0.373 0.054,0.719 0.065,0.867 0.07,0.941 0.079,1.055 0.085,1.115 0.089,1.162 0.1,1.254 0.106,1.293 0.109,1.31 0.113,1.33 0.116,1.341 0.119,1.349 0.124,1.365 0.128,1.369 0.131,1.372 0.137,1.372 0.14,1.369 0.145,1.365 0.153,1.344 0.156,1.334 0.161,1.319 0.167,1.29 0.173,1.265 0.188,1.198 0.216,1.03 0.233,0.965 0.239,0.94 0.25,0.91 0.256,0.896 0.259,0.889 0.263,0.882 0.266,0.879 0.269,0.875 0.275,0.87 0.279,0.869 0.282,0.867 0.288,0.868 0.291,0.869 0.295,0.871 0.3,0.874 0.306,0.881 0.325,0.905 0.364,0.986 0.383,1.012 0.39,1.021 0.399,1.031 0.405,1.035 0.41,1.039 0.421,1.045 0.427,1.046 0.434,1.047 0.448,1.044 0.457,1.041 0.475,1.034 0.515,1.003 0.533,0.995 0.544,0.99 0.56,0.984 0.574,0.983 0.607,0.981 0.683,0.041 0.72,0.043 0.757,0.045 0.831,0.998 0.868,0.998 0.901,0.997 1,1.351 1,1.351 ");

    gsap.fromTo(".ball",
      {
        x: "0%",       // start
        borderRadius: "15%",  // square-like
        rotate: 0,
        background: "radial-gradient(circle, #00bfff, #0077ff)",
        boxShadow: "0 0 20px #00bfff"
      },
      {
        x: 930,       // move to end
        rotate: 360,     // full spin
        borderRadius: "50%",   // slowly becomes circle
        duration: 3,
        ease: "soft",
        background: "radial-gradient(circle, #b700fffb, #ff00ffff)",
        boxShadow: "0 0 20px #ff00ffff",

        // repeat: -1,
        scrollTrigger: {
          trigger: ".ball",
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("scroll", handleScroll);
  };


}, [handleMouseMove, handleScroll]);


  return (
    <div className="main">
      {/* Custom cursors */}
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-trail" ref={trailRef}></div>

      <div className="neon-bg" ref={containerRef}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="blob"></div>
        ))}
      </div>

      {/* Navbar */}
      <header className="topbar">
        <Image
          src="https://framerusercontent.com/images/wXnyZRIxNTskCYfZxaUW8sl0bo.svg"
          alt="logo"
          width={120}
          height={30}
        />
        <button className="login-btn">Login now</button>
      </header>

      {/* Hero section */}
      <div className="tittle" data-aos="fade-up" ref={titleRef}>
        <h1 className="tagline shine-hover">
          Work Smarter, Not Harder
          <br />
          <span className="silver-hover space">
            All your tasks, deadlines, and projects in one AI-powered dashboard
          </span>
        </h1>
        <p className="sub" data-aos="fade-up">Transform Your Work. Amplify Your Growth.</p>
        <p className="sub" data-aos="fade-up">Your task now on train mode</p>
        <button className="get-start" data-aos="fade-up">Get started</button>
      </div>

      {/* Mission section */}
      <div id="mispart">
        <h1 id="mission" data-aos="fade-up">
          The Ultimate SaaS Platform for Teams and Professionals
        </h1>
      </div>
      <p className="sub" data-aos="fade-up">Manage projects, automate tasks, and gain insights with AI.</p>

      {/* Features section */}
      <div className="features-section" data-aos="fade-up">
        <h2 className="features-title">Everything You Need in One Platform</h2>
        <div className="features-grid">
          {[
            { h: "Smart AI Assistance", p: "AI suggests actions and improvements." },
            { h: "Task & Project Management", p: "Plan and complete projects faster." },
            { h: "Team Collaboration Tools", p: "Assign roles and communicate easily." },
            { h: "Customizable Workflows", p: "Build your own working style." },
            { h: "Analytics Dashboard", p: "Make decisions with real data." },
            { h: "Cloud Sync & Security", p: "Safe and updated across devices." },
          ].map((item, index) => (
            <div
              key={index}
              className="feature-card"
              ref={(el) => el && (cardsRef.current[index] = el)}
            >
              <h3>{item.h}</h3>
              <p>{item.p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="title">Trusted by Professionals Worldwide</h2>
        <p className="text">
          "This platform transformed how we work. Tasks are easier and faster."
        </p>
        <p className="author">— Jane D., Team Lead</p>
        <p className="logos-text">Used by 15,000+ professionals globally.</p>
      <div className="ball"></div>
      </section>


      {/* CTA */}
      <div id="cta2" data-aos="fade-up">
        <h3>Take Control of Your Productivity</h3>
        <h4>Simple. Smart. Powerful. Start growing today.</h4>
        <button className="get-start" id="get-start-2">Get started</button>
      </div>
    </div>
  );
}
