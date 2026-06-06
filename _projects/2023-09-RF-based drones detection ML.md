---
title: RF-based Drone Detection ML
description: RF-based data acquisition and detection of drones using Machine Learning.
slug: WNMA
screenshots:
  - /assets/img/projects/WNMA-3.PNG
  - /assets/img/projects/WNMA-1.PNG
  - /assets/img/projects/WNMA-2.PNG
authors:
  - SRiazRaza
repository: SRiazRaza/WNMA/blob/main/WNMA_Project.pdf
stars: 0
updated: 2023-09-01 08:05:07 UTC
host: https://github.com/SRiazRaza/WNMA
organizations:
  - University of Padova
---

✨ This project focuses on **RF-based data acquisition and machine learning classification for drone detection**. RC drone receivers emit PWM (Pulse Width Modulation) signals across multiple channels; the system captures these raw RF signals, extracts signal-to-noise ratio (SNR) features, and trains a machine learning model to identify drone presence and activity patterns.

The data pipeline reads 6-channel PWM data via a low-level C acquisition module, processes the raw signal through a Python utility layer for noise filtering and feature extraction, and feeds structured datasets into Jupyter-based ML experiments (run on Google Colab). Visualisations and evaluation metrics confirm model accuracy across different flight scenarios.

#### Model: Project

#### Tags:
  - Machine Learning
  - Signal Processing
  - Drone Detection
  - RF Analysis
  - Wireless Networks

#### Roles:
  - ML Engineer
  - Research Developer

#### Stack:
  - Python
  - Jupyter Notebook
  - Google Colab
  - C (data acquisition)
  - Signal Processing
