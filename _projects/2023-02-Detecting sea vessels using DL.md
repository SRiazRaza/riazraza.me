---
title: Detecting Sea Vessels using Deep Learning
description: Detecting sea vessels in SAR imagery using Deep Learning
slug: Vision-and-cognitive-systems
screenshots:
  - /assets/img/projects/vcs-1.PNG
  - /assets/img/projects/vcs-2.PNG
authors:
  - SRiazRaza
repository: SRiazRaza/Vision-and-cognitive-systems/blob/main/VCS_Project.pdf
stars: 0
updated: 2023-02-01 08:05:07 UTC
host: https://github.com/SRiazRaza/Vision-and-cognitive-systems
organizations:
  - University of Padova
---

✨ This project applies **object detection with deep learning to identify sea vessels in Synthetic Aperture Radar (SAR) satellite imagery** — a challenging task due to speckle noise and the grayscale nature of SAR images. The work was completed as part of the Vision and Cognitive Systems course at the University of Padova.

A **Faster R-CNN** architecture with a **ResNet-101 + Feature Pyramid Network (FPN)** backbone was selected for its strong multi-scale detection performance. The pipeline covers data preprocessing and augmentation to handle SAR-specific characteristics, model training with careful hyperparameter tuning, and comprehensive evaluation including mAP and per-class metrics. Results demonstrate that transfer-learned CNN backbones can effectively generalise to SAR modalities with appropriate preprocessing.

#### Model: Project

#### Tags:
  - Computer Vision
  - Deep Learning
  - Object Detection
  - SAR Imagery
  - Remote Sensing

#### Roles:
  - ML Engineer

#### Stack:
  - Python
  - PyTorch
  - Faster R-CNN (ResNet-101 FPN)
  - Jupyter Notebook
  - Google Colab
