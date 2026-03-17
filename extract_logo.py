#!/usr/bin/env python3
"""
Extract logo from video and create favicon
"""

import cv2
import os
from PIL import Image
import numpy as np

def extract_logo_from_video(video_path, output_logo_path, frame_number=30):
    """Extract a frame from video and save as WebP"""
    try:
        # Open the video
        cap = cv2.VideoCapture(video_path)
        
        if not cap.isOpened():
            print(f"Error: Could not open video {video_path}")
            return False
        
        # Get total frames
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        print(f"Total frames in video: {total_frames}")
        
        # Use a good frame (middle of video or specified frame)
        frame_to_extract = min(frame_number, total_frames - 1)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_to_extract)
        
        ret, frame = cap.read()
        cap.release()
        
        if not ret:
            print("Error: Could not read frame from video")
            return False
        
        # Convert BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Save original logo
        img = Image.fromarray(frame_rgb)
        img.save(output_logo_path, 'WEBP', quality=95)
        print(f"Logo saved as {output_logo_path}")
        
        # Create favicon versions
        favicon_sizes = [
            (32, 'favicon-32x32.png'),
            (64, 'favicon-64x64.png'),
            (128, 'favicon-128x128.png'),
            (192, 'favicon-192x192.png'),
            (256, 'favicon-256x256.png'),
        ]
        
        base_dir = os.path.dirname(output_logo_path)
        
        for size, filename in favicon_sizes:
            # Create square favicon
            img_resized = img.resize((size, size), Image.Resampling.LANCZOS)
            favicon_path = os.path.join(base_dir, filename)
            img_resized.save(favicon_path, 'PNG')
            print(f"Favicon created: {filename} ({size}x{size})")
        
        # Create ICO favicon
        img_ico = img.resize((32, 32), Image.Resampling.LANCZOS)
        ico_path = os.path.join(base_dir, 'favicon.ico')
        img_ico.save(ico_path, 'ICO')
        print(f"Favicon ICO created: favicon.ico")
        
        return True
    
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    video_path = os.path.join(script_dir, "ctex-logo-2.mp4")
    logo_path = os.path.join(script_dir, "ctex-logo.webp")
    
    print("Extracting logo from video...")
    if extract_logo_from_video(video_path, logo_path, frame_number=30):
        print("\nLogo and favicon creation successful!")
    else:
        print("\nFailed to create logo and favicon")
