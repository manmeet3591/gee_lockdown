This repository contains all the GEE codes for the paper "Quantifying global changes in atmospheric pollutants due to COVID-19 enforced lockdowns using Google Earth Engine"

Requires cartoee, cartopy, ee

Installation of cartoee : python 3.5

sudo apt-get install libproj-dev proj-bin
sudo apt-get install libgeos-dev

Install cartoee from source 

While installation an error in proj

In file included from lib/cartopy/trace.cpp:580:
/home/manmeet/anaconda3/envs/gee/include/proj_api.h:37:2: error: #error 'To use the proj_api.h you must define the macro ACCEPT_USE_OF_DEPRECATED_PROJ_API_H'

Go to the file proj_api.h and add

#define ACCEPT_USE_OF_DEPRECATED_PROJ_API_H to define the macro 
