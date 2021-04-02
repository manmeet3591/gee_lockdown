This repository contains all the GEE codes for the paper 

Singh, M., Singh, B.B., Singh, R., Upendra, B., Kaur, R., Gill, S.S. and Biswas, M.S., 2021. Quantifying COVID-19 enforced global changes in atmospheric pollutants using cloud computing based remote sensing. Remote Sensing Applications: Society and Environment, 22(100489) 13, https://doi.org/10.1016/j.rsase.2021.100489

# NO2 in 2019

![alt text](https://github.com/manmeet3591/gee_lockdown/blob/master/2019_no2.PNG?raw=true)

# NO2 in 2020

![alt text](https://github.com/manmeet3591/gee_lockdown/blob/master/2020_no2.PNG?raw=true)

The codes used for final publication figures are in the folder submission1 and are as follows

gee_covid_aod_v2.ipynb

gee_covid_no2_v2.ipynb

gee_covid_o3_v2.ipynb

gee_covid_pm25_v2.ipynb

gee_covid_megacities_v1.ipynb

The codes for Google Earth Engine apps are in the file apps.js

# Google Earth Engine apps

A set of six Google Earth Engine apps have been developed to aid in enhanced visualization of the changes/improvements in air quality due to COVID-19 lockdowns. For best visualization of these apps, Google Chrome browser is recommended. They can be accessed from the links below:

AOD: https://manmeet20singh15.users.earthengine.app/view/aodlockdown.

NO2: https://manmeet20singh15.users.earthengine.app/view/no2lockdown.

Tropospheric ozone:

https://manmeet20singh15.users.earthengine.app/view/tropospherico3lockdown.

PM2.5: https://manmeet20singh15.users.earthengine.app/view/pm25lockdown.

Land surface temperature: https://manmeet20singh15.users.earthengine.app/view/lstlockdown.

Surface winds: https://manmeet20singh15.users.earthengine.app/view/windlockdown.

# Prerequisites

Requires cartoee, cartopy, ee and a Google Earth Engine account

Installation of cartoee : python 3.5

sudo apt-get install libproj-dev proj-bin
sudo apt-get install libgeos-dev

Install cartoee from source 

While installation an error in proj

In file included from lib/cartopy/trace.cpp:580:
/home/manmeet/anaconda3/envs/gee/include/proj_api.h:37:2: error: #error 'To use the proj_api.h you must define the macro ACCEPT_USE_OF_DEPRECATED_PROJ_API_H'

Go to the file proj_api.h and add

#define ACCEPT_USE_OF_DEPRECATED_PROJ_API_H to define the macro 
