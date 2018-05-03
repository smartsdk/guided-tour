# User&#39;s guide for Smart Spot Starter Kit

## Introduction

In order to offer a simple and intuitive way to get started with our Smart Spot
we have developed an Open Source solution called Smart Spot Starter Kit, which
has an obvious educational purpose. Just by simply obtaining this kit and 
follow this guide you will be able to manage the device and to acquire data 
from its board sensors, apart from the ones you connect with your smartphone.

To achieve this, we take advantage from technologies like Physical Web. Users
interact via their smartphones thanks to our device that sends &quot;push&quot;
notifications with digital content through Bluetooth without the need to 
install native Apps.

In order to monitorize the air pollution, Smart Spot measures the NO2, CO, SO2
and O3 at specific points in real time. We have a sophisticated high precision
lab, with a Mass Flow Controller and a Zero Air Generator, where through 
Machine Learning algorithms we improve the precision of our sensor measures 
reducing the effect of cross sensitivity.

For the care and management of data collected by the Smart Spot a maintenance
platform is  needed, our device can be managed remotely by platforms which use
OMA LWM2M as FIWARE. We deploy FIWARE to manage Smart Spot data and also, we
integrate our solution in already existing FIWARE ecosystems.

Optionally, this system provides information about crowds in specific areas,
detecting people with smartphone WiFi switched-on.

## What do you need?
What is included with The Smart Spot Starter Kit:

   1. [ESP32 DevKitC](http://a.co/6nSNpvA):    
      ![ESP32-DevKitC](./images/ESP32-DevKitC.png)
   2. Starter Kit firmware
      * Physical Web
      * Crowd Monitoring
      * LwM2M server
      * Integration with I2C sensor
      * GPIO driver
   3. [Expansion Board](http://www.hopu.eu/):  
      * Temperature, Humidity and Pressure Sensor.
      * Accelerometer and Gyroscope.
      * Luminosity Sensor
      * RGB led
      * GPIO Led
   4. Micro USB Cable
   5. [Smart Spot Air Quality Expansion Board](http://www.hopu.eu/)  
   6. I2C Cable (included with the expansion board)  
      ![I2C Cable](./images/I2C.png)    
   7. 4 x [Gas Sensors](http://www.alphasense.com/index.php/air/):  
      * Sulfur Dioxide (Red).
      * Ozone + Nitrogen Dioxide (Yellow).
      * Carbon Monoxide (Green).
      * Nitrogen Dioxide (Orange).
      
      ![Device manager](./images/sensor.png) 


## Getting Started 

## Device Configuration:  
This chapter is a guide for Windows users. In case you use another OS, you can 
find further information in the following link:
[ESP-IDF](http://esp-idf.readthedocs.io/en/latest/get-started/index.html)

   1. First, you need to download the ESP32 toolchain by clicking in this link:
   [ESP32 toolchain](https://bit.ly/2js02AW). Unzip it and place somewhere safe.
   This guide assumes the environment is placed in  C:\ .

   2. You will also need the ESP32 API. In order to download it, open a
   terminal, navigate to a directory where you want to place the IDF and use
   these commands:   
   
      ~~~

      $ git clone --recursive https://github.com/espressif/esp-idf.git

      $ git checkout tags/v3.0-rc1

      $ git submodule update –init

      ~~~
   
      Every time you restart your PC you will need to define the IDF\ \_PATH by
      using this command:

      ~~~

      $ export IDF\_PATH=&quot;C:/msys32/home/user-name/esp/esp-idf&quot;

      ~~~ 

      In case you want to set the path permanently, check out this link:
      IDFPATH for Windows: <https://bit.ly/2KxiunW>
      
   3. Now is time to download the Smart Sport Firmware. You should open a
      terminal in  another directory and clone our firmware by using the 
      following command:

      ~~~

      $ git clone –-https://github.com/HOP-Ubiquitous/SmartSpot\_SmartSDK\_Firmware.git
      
      ~~~

   4. Once you downloaded everything, open the ESP32 toolchain in order to 
      flash the  firmware. Go to the directory where you placed the 
      toolchain and execute the  file mingw32.
      
         ![Device manager](./images/directory.png)

   5. Plug your ESP32 into your PC. Then go to Device Manager and look for its
      port number (i.e.: COM3).   
        
        ![Device manager](./images/device-manager.png)
         
      You may have to download its driver in case you are not able to flash.
      Download it here.

        [USB to UART Bridge](https://bit.ly/2v0gwnS)

   6. It is time to flash the esp32. Open a Mingw32 terminal and copy the port
      and the directory of bootloader.bin, smartspot-esp32.bin, 
      partitions_singleapp.bin and esptool.py: 
      
      * **esptool.py directory** 
      * **Port** 
      * **Bootloader.bin directory** 
      * **smartspot-esp32.bin directory** 
      * **partitions_singleapp.bin directory**

	  Replace them by the bolded words of the following command:

      ~~~

      $ python 
      /c/Users/HOPU/GitHub/espidf/components/esptool_py/esptool/esptool.py --chip esp32 
      --port COMX --baud 115200 --before default_reset --after hard_reset 
      write_flash -z --flash_mode dio --flash_freq 40m --flash_size detect 0x1000      
      C:/Users/HOPU/GitHub/SmartSpot_SmartSDK_Firmware/bootloader.bin 0x10000
      C:/Users/HOPU/GitHub/SmartSpot_SmartSDK_Firmware/smartspot-esp32.bin 0x8000            
      C:/Users/HOPU/GitHub/SmartSpot_SmartSDK_Firmware/partitions_singleapp.bin
      
      ~~~

      Copy then the whole command and use it for flashsing the esp32.
		         
      ![Sensors](./images/python.png)

      A message like the one above should appear if you flashed the firmware successfully.



### Expansion board integration

This is a detailed list of the expansion board components:

   * **Bme280** : This well-known sensor from Bosch measures humidity with ±3% 
     accuracy, barometric pressure with ±1 hPa absolute accuracy, and temperature 
     with ±1.0°C accuracy. It can be used either with SPI or I2C.
   * **Mpu6050** : this sensor contains a MEMS accelerometer and a MEMS gyro in a
     single chip. It is very accurate, as it contains 16-bits analog to digital
     conversion hardware for each channel. Therefor it  captures the x, y, and z
     channel at the same time. The sensor uses the I2C-bus interface.
   * **Opt3001** : is a sensor that measures the intensity of visible light. The 
     spectral response of the sensor tightly matches the photopic response of the 
     human eye and includes significant infrared rejection.
   * **WS2812** : is an intelligent control LED light source that the control 
     circuit and RGB chip are integrated in a package of 5050 components. It
     internally includes digital port latch and reshaping amplification drive
     circuit. Each color has a different meaning, representing the current status of
     the Smart Spot:
      * Purple: Starting software.
      * Blue: Attaching to global connectivity.
      * Orange: Bootstrapping. Connecting to LwM2M servers.
      * Green: Device fully functional.
   * **GPIO Led** : is just simply a Led controlled by a GPIO pin of the ESP32. You
     can manage and switch it on/off from the dashboard.

The expansion board is completely plug and play. If you previously flashed the 
ESP32 correctly you will only have to plug it in its mark.

   ![Board](./images/board.png)

### Gas Sensor Integration

The idea is to connect the Smart Spot Starter Kit with the gas sensors. Between
the available gases, we selected the most important to quantify the air quality
(gases required by the OMS), the most interesting depending of the use cases but
also interesting gases to carry out corrections in measures:

   * NO2: Nitrogen dioxide
   * SO2: Sulfur dioxide
   * O3: Ozone
   * CO: Carbon monoxide

   ![Sensors](./images/sensors.png)

In order to carry out the connection between the Expansion board and the Smart
Spot Air Quality Expansion Board you only have to plug the I2C cable to one of
the two I2C Smart Spot Connectors. Regarding I2C Gas connectors, the every port
must match its gas:

| Port | Gas                |
| ---- |:------------------:|
| J3   | NO2                |
| J4   | O3                 |
| J5   | CO                 |
| J6   | SO2                |
| J7   | Work in Progress   |
| J8   | Work in Progress   |

The Smart Spot LwM2M Client offers both a proprietary OMA LwM2M object called
*"SmartSpot Gas Concentration"* created specifically to provide information
related to interesting variables of the gas sensors, and on the other hand the
standard IPSO Alliance Concentration Object. Information and specification 
about this last one can be found in this [link](https://bit.ly/2FDVC2s).

These object are multinstance. Each analyte (the gas that is going to be
measured) has a ID instance. For example, if you want to know the current
concentration value of CO you will have to read the resource *3325/2/5700*. 

### Device Deployment 

The Smart Spots have a pre-configured WiFi Station where 
devices will connect. This AP can be easily deployed from smartphones, GSM 
routers, common WiFi Access Points, …

The default configuration is: 
SSID name: **defaultSSAP** 
Password: **defaultSSAP1234**

You must create an access point in your smartphone (HotSpot) or router with the
default SSID name and Password for the device to connect to the network. When
this access point is created the device connect automatically.

With a Wi-Fi hotspot, you can share your mobile data connection on your
smartphone wirelessly. Look in your Settings menu for Wireless & Network and
check where you can enable a Wi-Fi hotspot. You should change now the SSID and
Password for the ones above.

   ![Connection](./images/connection.png)


## Infrastructure Deploy: 
In order to facilitate the interaction and configuration between user and 
devices, a fiware infrastructure will be deployed. It will allow the 
connection and configuration of LwM2M clients, storing data and building 
custom applications. 
(If you have any LwM2M Server were to connect your devices you can skip this
section). 

### Prerequisites: 
   * Ubuntu 16.04 or higher. You can find it [here](https://www.ubuntu.com/
     download/desktop). 

   * Docker. Instruction [here](https://docs.docker.com/install/linux/
     docker-ce/ubuntu/) or [here](https://www.digitalocean.com/community/
     tutorials/como-instalar-y-usar-docker-en-ubuntu-16-04-es). 

   * Docker Compose. Instruction [here](https://docs.docker.com/compose/
     install/#prerequisites). 

### Configuration

Services in the architecture are deployed using a docker-compose file, all the
documentation and code can be found [here](https://github.com/HOP-Ubiquitous/
fiware-docker-infrastructure).

The repository can be easily cloned with the following command:

    ~~~

    $ git clone https://github.com/HOP-Ubiquitous/fiware-docker-infrastructure

    ~~~

#### Ubuntu User

Therefore, the configuration options are explicitly declared in this file. For
services with complex configuration a brief extra description is provided.

Please, take into account that the guidelines that you can find in the HOP
Ubiquitous github are thought for a localhost deployment. If you are making a
distributed deployment, please make sure to have the proper ports open and the
different hosts with visible ips addresses between each other.

#### Windows User

For Windows users is necessary install a virtual machine to run Ubuntu in your
PC. [VirtualBox](https://www.virtualbox.org/) is a option for this issue. 
Create a new virtual Machine, choose a name, type Linux and Version Ubuntu 
(32bits or 64bits). Select the options that you prefer of your virtual machine 
in the next dialog windows.

The first time that you start your virtual machine, VirtualBox will ask you
about the Ubuntu Install file. Search the file in this window dialog and Ubuntu
will start to install.

For a correct operation of Smart Spot Open Hardware you must consider that the
network adapter is “bridge adapter mode”. This option is in VirtualBox /
configuration / network, and the dropdown “connect to” and choose “Bridge
adapter”. 

#### Deployed services:

##### IoT Agent Configuration

In order to be able to map
the OMA LwM2M information model to OMA NGSI entities, attributes and metadata a
configuration file is created reflecting the correspondence. config.js in the
docker-compose/ directory contains two blocks:

   * LwM2M Server configuration, specifying aspects like server port, content-
     format used or the log level of the service.

   * NGSI configuration, where information about the http server, the storage 
     and the mapping between the protocols are specified. On the other hand, 
     a dynamic configuration can be carried out using the service API. The 
     postman collection of this service provides a skeleton template.  

More information about the component can be found in the [LwM2M IoT Agent 
Guide](http://fiware-iotagent-lwm2m.readthedocs.io/en/latest/).

##### Cygnus configuration
agent.conf In order to configure the channels and databases in which the
information will persist, it is necessary to configure the agent.conf file in
the docker-compose/ directory. This file will be loaded into the docker
container as a configuration file. An example of the file that is loaded by
default can be found in this [url](https://github.com/telefonicaid/fiware-
cygnus/blob/master/docker/cygnus-ngsi/agent.conf). In the previous example we 
can see how to initialize each of the different connectors to databases.

To simplify the debug better add only the necessary onesOrion-Cygnus
Communication In order to get the information that reaches Orion to be
persistent, it is necessary to create subscriptions on Orion by setting Cygnus
as the url of the callback. An example of the subscription to create can be
found in the [postman](https://www.getpostman.com/) collection within the main
directory. More information about the component can be found in the [Cygnus
Guide](http://fiware-cygnus. readthedocs.io/en/latest/).

##### QuantumLeap, Crate and Grafana configuration 
These three components work jointly to accomplish a visual representation of 
the information in Orion Context Broker. QuantumLeap is a library that receives
Orion information through subscriptions and stores the information in a Crate 
database. Last, the grafana container launches a web services with user 
interface in which the Crate database deployed can be configured as data 
source. A more detailed guide of this services interaction can be found in the
use-cases/ directory. 

##### Perseo-core and Perseo-fe configuration 
Perseo CEP is a Complex Event Processing (CEP) module. In this module, Perseo-
core is the  back-end of Perseo CEP, the rule-engine. It checks incoming events
and, if any action must be done, it call to Perseo-fe through a POST request.
Perseo-fe refresh the set of Perseo-core rule periodically. When Perseo-core
send an action to Perseo-fe, it is responsible of send an action vía SMS, e-mail
or HTTP. A more detailed guide of this services interaction can be found in the
use-cases/ directory.docker-compose.yml In order for Perseo CEP can send a
notification, it must have configured the following servers: SMPP, SMTP and HTTP
in docker-compose.yml file contained in the docker-compose/ directory. The
environment variables available for Perseo configuration can be found in this
url.

### Build, deploy and run 

