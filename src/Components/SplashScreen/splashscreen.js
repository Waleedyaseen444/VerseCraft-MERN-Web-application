import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typical from 'react-typical';
import './splashscreen.css';
import logo from "../Images/Logo-V.png";
import SC01 from "../Images/showcase01.jpg";
import SC02 from "../Images/showcase02.jpg";
import SC03 from "../Images/showcase03.jpg";
import text01 from "../Images/text01.png";
import text02 from "../Images/text02.jpg";
import text03 from "../Images/text03.jpg";
import collab from "../Images/collab 02.png";
import ai from "../Images/ai.png"
import analytics from "../Images/analytics.png"
import feedback from "../Images/feedback.png"
import editor from "../Images/editors.png"
import organize from "../Images/oraganize.png"
import check from "../Images/check.png";
import logoIcon from '../Images/Logo-V.png';
import { IconButton } from '@mui/material';
import { X, Facebook, LinkedIn, Instagram } from '@mui/icons-material';



const SplashScreen = ({
    splashDuration = 4000, // Duration of the splash screen in ms
    transitionDuration = 5000, // Duration of the orange transition in ms
    mainAppDisplayDelay = 2500, // Delay after transition starts to display main app
}) => {
    const [loading, setLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showMainApp, setShowMainApp] = useState(false); // New state
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/Login'); 
      };

      const handleSignUpClick = () => {
        navigate('/Signup'); 
      };


      
      useEffect(() => {
        const hasTransitioned = localStorage.getItem("hasTransitioned");

        if (!hasTransitioned) {
            // First time loading the app, show transition
            localStorage.setItem("hasTransitioned", "true"); // Store flag
            setIsTransitioning(true);
        } else {
            // Skip transition and go straight to main app
            setLoading(false);
            setShowMainApp(true);
        }

        const mainAppTimer = setTimeout(() => {
            setShowMainApp(true);
            setLoading(false);
        }, splashDuration + mainAppDisplayDelay);

        return () => clearTimeout(mainAppTimer);
    }, [splashDuration, mainAppDisplayDelay]);

    const handleTransitionComplete = () => {
        setIsTransitioning(false); // Stops the transition from appearing again
    };


    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    

    // Keyframe animation for the main box
    const keyframeAnimation = {
        animate: {
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        },
        transition: {
            duration: 3, // Duration of the box animation
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: 0,
            repeatDelay: 1.5,
        },
    };

    const letters = ['V', 'E', 'R', 'S', 'E','C','R','A','F','T'];

    // Variants for the orange transition screen
    const orangeScreenVariants = {
        hidden: { x: '-100%' },
        visible: { 
            x: '100%',
            transition: { 
                duration: transitionDuration / 1000, // Convert ms to seconds
                ease: 'easeInOut' 
            }
        },
    };

    return (
        <div className="app-container">
            {/* Splash Screen */}
            {loading && !showMainApp && (
                <div className="splash-container">
                    <div className="splash-screen">
                        <h1 className="splash-tagline">
                            <Typical
                                steps={[
                                    'U', 100,
                                    'Un', 100,
                                    'Unl', 100,
                                    'Unle', 100,
                                    'Unleas', 100,
                                    'Unleash', 100,
                                    'Unleash ', 100,
                                    'Unleash Y', 100,
                                    'Unleash Yo', 100,
                                    'Unleash You', 100,
                                    'Unleash Your', 100,
                                    'Unleash Your ', 100,
                                    'Unleash Your S', 100,
                                    'Unleash Your St', 100,
                                    'Unleash Your Sto', 100,
                                    'Unleash Your Stor', 100,
                                    'Unleash Your Story', 5000
                                ]}
                                loop={1}
                                wrapper="span"
                            />
                        </h1>

                        <div className="splash-animations">
                            {letters.map((letter, index) => (
                                <motion.div
                                    key={index}
                                    {...keyframeAnimation}
                                    className={`splash-box box${index + 1}`}
                                >
                                    <span className="box-letter">{letter}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            className="splash-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 2 }}
                        >
                            Loading your creative space...
                        </motion.p>
                    </div>
                </div>
            )}

            {/* Orange Transition */}
            {isTransitioning && (
                <motion.div
                    className="orange-transition"
                    variants={orangeScreenVariants}
                    initial="hidden"
                    animate="visible"
                    onAnimationComplete={handleTransitionComplete}
                />
            )}

            {/* Main Application */}
            {showMainApp && (
                 <div className="splash-main-app">w
                    <div className="landing-header">
                        <div className="landing-page-logo-container">
                        <img src={logo} alt="landing-page-logo" className="landing-page-logo"/>
                        </div>
                        <div className="landing-page-logo-text">VERSECRAFT</div>
                        <div className="landing-page-features-button"  onClick={() => scrollToSection('features')}>Features</div>
                        <div className="landing-page-workflow-button"  onClick={() => scrollToSection('workflow')}>Workflow</div>
                        <div className="landing-page-testimonials-button" onClick={() => scrollToSection('testimonials')}>Testimonials</div>
                        <div className="landing-page-contact-button" onClick={() => scrollToSection('contact')}>Contact</div>
                        <div className="landing-page-sign-in-button" onClick={handleLoginClick}> Sign in</div>
                        <div className="landing-page-create-account-button" onClick={handleSignUpClick}> Create an Account</div>
                    </div>
                    <div className="landing-page-hero-section">
                        <div className="landing-page-hero-section-heading">Unleash Your Creativity: Write Smarter with AI</div>
                        <div className="landing-page-hero-section-sub-heading">Revolutionize how you create stories with organization and customization</div>
                        <div className="landing-page-hero-section-get-started-button">Get Started</div>
                        <div className="landing-page-hero-section-showcase">
                        <img src={SC01} alt="landing-page-hero-section-showcase-01" className="landing-page-showcase-01"/>
                        <img src={SC02} alt="landing-page-hero-section-showcase-02" className="landing-page-showcase-02"/>
                        <img src={SC03} alt="landing-page-hero-section-showcase-03" className="landing-page-showcase-03"/>
                        </div>
                    </div>



                    <div className="landing-page-feature-section" id="features">
                        <h1>
                        <span class="gradient-text01"><u>Features</u></span>
                        </h1>
                        <h2>Easily Manage and Create 
                             <span class="gradient-text02">Your Projects</span>
                        </h2>
                        {/*
                        <div className="landing-page-path-morphing">
                            <PathMorphing />
                        </div>
                        */}
                            <div className="landing-page-features-container">
                                <div className="landing-page-feature-item-01">
                                    <div className="landing-page-feature-item-header">
                                         <img src={collab} alt="landing-page-feature-logo-01" className="landing-page-feature-logo-01"/>
                                         <h3>Collaborative Tools</h3>
                                    </div>
                                    <p>Enable seamless teamwork by allowing multiple users to collaborate on projects in real-time. Includes version control and comment features to track changes and feedback.</p>
                                </div>
                                <div className="landing-page-feature-item-02">
                                <div className="landing-page-feature-item-header">
                                <img src={ai} alt="landing-page-feature-logo-02" className="landing-page-feature-logo-02"/>
                                    <h3>Ai Assisstance</h3>
                                    </div>
                                    <p>Leverage AI-powered tools to suggest content improvements, auto-generate ideas, or fix grammar and spelling errors.</p>
                                </div>
                                <div className="landing-page-feature-item-03">
                                    
                                <div className="landing-page-feature-item-header">
                                <img src={organize} alt="landing-page-feature-logo-03" className="landing-page-feature-logo-03"/>
                                    <h3>Organizational Tools</h3>
                                    </div>
                                    <p> Provides a central hub to organize your projects, categorize ideas, and manage timelines efficiently.</p>
                                </div>

                                <div className="landing-page-feature-item-04">
                                <div className="landing-page-feature-item-header">
                                <img src={analytics} alt="landing-page-feature-logo-04" className="landing-page-feature-logo-04"/>
                                    <h3>Analytics Dashboard</h3>
                                    </div>
                                    <p>Track your progress with detailed analytics on writing productivity, project milestones, and collaboration stats.</p>
                                </div>
                                <div className="landing-page-feature-item-05">
                                <div className="landing-page-feature-item-header">
                                <img src={feedback} alt="landing-page-feature-logo-05" className="landing-page-feature-logo-05"/>
                                    <h3>Community Feedback</h3>
                                    </div>
                                    <p>Get valuable input from a community of peers, including critiques, suggestions, and encouragement.</p>
                                </div>
                                <div className="landing-page-feature-item-06">
                                <div className="landing-page-feature-item-header">
                                <img src={editor} alt="landing-page-feature-logo-06" className="landing-page-feature-logo-06"/>
                                    <h3>Multiple Editors</h3>
                                    </div>
                                    <p>Supports novel and story editing modes in both english and urdu</p>
                                </div>
                         </div>
                    </div>

                    <div className="landing-page-workflow-section" id="workflow">
                        <h2>All-In-One Solution To
                             <span class="gradient-text02">Accelerate Your Workflow</span>
                        </h2>
                        <div className="landing-page-workflow-container">
                            <div className="landing-page-workflow-image-container">
                                <img src={text01} alt="landing-page-workflow-section-text-01" className="landing-page-workflow-text-01"/>
                                <img src={text02} alt="landing-page-workflow-section-text-02" className="landing-page-workflow-text-02"/>
                                <img src={text03} alt="landing-page-workflow-section-text-03" className="landing-page-workflow-text-03"/>
                            </div>
                            <div className="landing-page-workflow-text-container">
                                <div className="landing-page-workflow-item-01">
                                    <div className="landing-page-workflow-text-header-container">
                                    <img src={check} alt="landing-page-workflow-logo-01" className="landing-page-workflow-logo-01"/>
                                    <h3>Project Creation</h3>
                                    </div>
                                    <p>Enable seamless teamwork by allowing multiple users to collaborate on projects in real-time. Includes version control and comment features to track changes and feedback.</p>
                                </div>
                                <div className="landing-page-workflow-item-02">
                                <div className="landing-page-workflow-text-header-container">
                                    <img src={check} alt="landing-page-workflow-logo-01" className="landing-page-workflow-logo-01"/>
                                    <h3>Collaboration</h3>
                                    </div>
                                    <p>Leverage AI-powered tools to suggest content improvements, auto-generate ideas, or fix grammar and spelling errors.</p>
                                </div>
                                <div className="landing-page-workflow-item-03">
                                <div className="landing-page-workflow-text-header-container">
                                    <img src={check} alt="landing-page-workflow-logo-01" className="landing-page-workflow-logo-01"/>
                                    <h3>Character and Plot Organization</h3>
                                    </div>
                                    <p> Provides a central hub to organize your projects, categorize ideas, and manage timelines efficiently.</p>
                                </div>

                                <div className="landing-page-workflow-item-04">
                                <div className="landing-page-workflow-text-header-container">
                                    <img src={check} alt="landing-page-workflow-logo-01" className="landing-page-workflow-logo-01"/>
                                    <h3>Publishing</h3>
                                    </div>
                                    <p>Track your progress with detailed analytics on writing productivity, project milestones, and collaboration stats.</p>
                                </div>
                                <div className="landing-page-workflow-item-05">
                                <div className="landing-page-workflow-text-header-container">
                                    <img src={check} alt="landing-page-workflow-logo-01" className="landing-page-workflow-logo-01"/>
                                    <h3>Feedback and Reviews</h3>
                                    </div>
                                    <p>Get valuable input from a community of peers, including critiques, suggestions, and encouragement.</p>
                                </div>
                                <div className="landing-page-workflow-item-06">
                                <div className="landing-page-workflow-text-header-container">
                                    <img src={check} alt="landing-page-workflow-logo-01" className="landing-page-workflow-logo-01"/>
                                    <h3>Analytics</h3>
                                    </div>
                                    <p>Supports novel and story editing modes in both english and urdu</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                 <section className="landing-page-testimonial-section" id="testimonials">
                     <h2>
                     <span class="gradient-text02">What Our Users Say</span>
                     </h2>
                     <div className="landing-page-testimonials-container">
                         <div className="landing-page-testimonial-item-01">
                             <p>"This platform changed the way I work!"</p>
                             <p>- Happy User</p>
                         </div>
                         <div className="landing-page-testimonial-item-02">
                             <p>"A must-have for every creative individual."</p>
                             <p>- Satisfied Client</p>
                         </div>
                         <div className="landing-page-testimonial-item-03">
                             <p>"A must-have for every creative individual."</p>
                             <p>- Satisfied Client</p>
                         </div>
                         <div className="landing-page-testimonial-item-04">
                             <p>"A must-have for every creative individual."</p>
                             <p>- Satisfied Client</p>
                         </div>
                         <div className="landing-page-testimonial-item-05">
                             <p>"A must-have for every creative individual."</p>
                             <p>- Satisfied Client</p>
                         </div>
                         <div className="landing-page-testimonial-item-06">
                             <p>"A must-have for every creative individual."</p>
                             <p>- Satisfied Client</p>
                         </div>
                     </div>
                 </section>

                 <footer className="splashscreen-footer-container">
             <div className="splashscreen-footer-links">
                <div className="splashscreen-footer-about-section">About
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Contact us</p>
                    <p>Investors</p>
                </div>
                <div className="splashscreen-footer-discover-section">Discover
                    <p>Explore</p>
                    <p>Features</p>
                    <p>Help and Support</p>
                </div>
                <div className="splashscreen-footer-legal-section">Legal and Accessibility
                    <p>Privacy Policy</p>
                    <p>Copyright Policy</p>
                    <p>Terms and conditions</p>
                </div>
             
            </div>
            <div className="splashscreen-footer-explore-section"></div>
            
            
            <div className="splashscreen-footer-logo-container">
                <div className="splashscreen-footer-logo-image">
                    <img src={logoIcon} alt="home" className="header-logo-icon"></img>
                </div>
                <div className="splashscreen-footer-logo-text">VerseCraft</div>
                <div className="splashscreen-footer-socials">
                    <div className="splashscreen-footer-social-icons">
                        <IconButton 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-icon twitter"
                        >
                            <X/>
                        </IconButton>
                        
                        <IconButton 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-icon facebook"
                        >
                            <Facebook />
                        </IconButton>
                        
                        <IconButton 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-icon linkedin"
                        >
                            <LinkedIn />
                        </IconButton>
                        <IconButton 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-icon instagram"
                        >
                            <Instagram />
                        </IconButton>
                    </div>
                </div>
                <div className="splashscreen-footer-reserve">© {new Date().getFullYear()} VerseCraft. All rights reserved.</div>
            </div>
            </footer>
      

               
             
             </div>
         )}
        
     </div>
    );
};

export default SplashScreen;
