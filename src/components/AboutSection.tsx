import React from 'react';
import { User, GraduationCap, Code, Music, Heart, Coffee, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AboutSection = () => {
  return (
    <section id="about-section" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">About the Creator</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Hi there! 👋</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a second-year <strong className="text-foreground">CSE (AIML) student</strong> at 
                <strong className="text-primary"> Brainware University</strong>. Fed up with Spotify's 
                premium prompts, I built my own music player.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span>Computer Science & Engineering (AI/ML)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-primary" />
                  <span>React, TypeScript, Python enthusiast</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Music className="w-5 h-5 text-primary" />
                  <span>Music lover who refuses to pay for premium</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://github.com', '_blank')}
                  className="hover:bg-primary hover:text-white border-primary/30"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                  className="hover:bg-primary hover:text-white border-primary/30"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-xl p-6 border border-primary/20">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  Why Gumu Player?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Tired of constant premium upgrade prompts interrupting my study sessions, 
                  I decided to build something better. Gumu Player gives you unlimited music 
                  streaming without the premium pressure.
                </p>
              </div>

              <div className="glass rounded-xl p-6 border border-primary/20">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Coffee className="w-5 h-5 text-amber-500 mr-2" />
                  Built with Love & Caffeine
                </h4>
                <p className="text-sm text-muted-foreground">
                  Created during late-night coding sessions fueled by coffee and the 
                  frustration of interrupted music. Every feature is designed with 
                  student life in mind.
                </p>
              </div>

              <div className="glass rounded-xl p-6 border border-primary/20">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Code className="w-5 h-5 text-blue-500 mr-2" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Tailwind CSS', 'YouTube API', 'PWA'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-surface text-xs rounded-full border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground italic">
              "If you can't afford premium, build your own premium." 
              <span className="block mt-2 text-sm">- A broke CSE student</span>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Enjoying Gumu Player? Share it with your friends who are also tired of premium prompts! 
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Gumu Player - Free Music Streaming',
                    text: 'Check out this awesome music player built by a CSE student!',
                    url: window.location.href
                  });
                }
              }}
            >
              Share App
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};