var config = {};

config.lwm2m = {
    logLevel: 'DEBUG',
    port: '5683',
    defaultType: 'SmartSpot',
    ipProtocol: 'udp4',
    serverProtocol: 'udp4',
    delayedObservationTimeout: 2000,
    formats: [
        {
            name: 'application-vnd-oma-lwm2m/tlv',
            value: 11542
        },
        {
            name: 'application-vnd-oma-lwm2m/json',
            value: 11543
        },
        {
            name: 'application-vnd-oma-lwm2m/opaque',
            value: 11544
        }
    ],
    writeFormat: 'application-vnd-oma-lwm2m/opaque',
    types: [
        {
            name: 'SmartSpot',
            url: '/smartspot'
        }
    ]
};

config.ngsi = {
    logLevel: 'DEBUG',
    contextBroker: {
        host: 'orion',
        port: '1026'
    },
    server: {port: '4042'},
    deviceRegistry: {type: 'mongodb'},
    mongodb: {
        host: 'mongo',
        port: '27017',
        db: 'mongo-iotagent'
    },
    types: {
        'SmartSpot': {
            service: 'SmartSpot',
            subservice: '/smartspot',
            removeSuffix: true,
            commands: [],
            lazy: [
    {
                    name: 'physicalUrl',
                    type: 'string'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState0',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState1',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState2',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState3',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState4',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState5',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState6',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState7',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState8',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState9',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState10',
                    type: 'boolean'
                },
    {
                    name: 'IPSODigitalOutputDigitalOutputState11',
                    type: 'boolean'
                },
    {
                    name: 'NearWiFiDevicesRestrictdetectionwithRSSIthreshold',
                    type: 'integer'
                },
    {
                    name: 'WLANConnectivitySSID',
                    type: 'string'
                },
    {
                    name: 'WLANConnectivityWPAPreSharedKey',
                    type: 'string'
                }
            ],
            active: [
    {
                    name: 'temperature',
                    type: 'float'
                },
                {
                    name: 'humidity',
                    type: 'float'
                },
                {
                    name: 'IPSOAnalogInputAnalogInputCurrentValue0',
                    type: 'integer'
                },
                {
                    name: 'IPSOAnalogInputAnalogInputCurrentValue1',
                    type: 'integer'
                },
                {
                    name: 'IPSOAnalogInputAnalogInputCurrentValue2',
                    type: 'integer'
                },
                {
                    name: 'IPSOAnalogInputAnalogInputCurrentValue3',
                    type: 'integer'
                },
                {
                    name: 'IPSOAnalogInputAnalogInputCurrentValue4',
                    type: 'integer'
                },
                {
                    name: 'IPSOIlluminanceSensorValue',
                    type: 'float'
                },
                {
                    name: 'IPSOAccelerometerXValue',
                    type: 'float'
                },
                {
                    name: 'IPSOAccelerometerYValue',
                    type: 'float'
                },
                {
                    name: 'IPSOAccelerometerZValue',
                    type: 'float'
                },
                {
                    name: 'IPSOPressureSensorValue',
                    type: 'float'
                },
                {
                    name: 'IPSOConcentrationSensorValue0', //NO2
                    type: 'float'
                },
                {
                    name: 'IPSOConcentrationSensorValue1', //CO
       type: 'float'
                },
                {
                    name: 'IPSOConcentrationSensorValue2', //O3
                    type: 'float'
                },
                {
                    name: 'IPSOConcentrationSensorValue3', //SO2
                    type: 'float'
                },
                {
                    name: 'NearWiFiDevicesLastDeviceinformation',
                    type: 'integer'
                },
    {
                    name: 'NearWiFiDevicesDevicesfoundinthelastmin',
                    type: 'integer'
                },
                {
                    name: 'NearWiFiDevicesDevicesfoundinthelast10min',
                    type: 'integer'
                },
                {
                    name: 'NearWiFiDevicesDevicesfoundinthelasthour',
                    type: 'integer'
                }
                 ],
            lwm2mResourceMapping: {
      'IPSOAnalogInputAnalogInputCurrentValue0':{ 
            objectType:3202,
            objectInstance:0,
            objectResource:5600
            },
        'IPSOAnalogInputAnalogInputCurrentValue1':{
            objectType:3202,
            objectInstance:1,
            objectResource:5600
            },
        'IPSOAnalogInputAnalogInputCurrentValue2':{
            objectType:3202,
            objectInstance:2,
            objectResource:5600
            },
        'IPSOAnalogInputAnalogInputCurrentValue3':{
            objectType:3202,
            objectInstance:3,
            objectResource:5600
            },
        'IPSOAnalogInputAnalogInputCurrentValue4':{
            objectType:3202,
            objectInstance:4,
            objectResource:5600
            },
        'IPSOIlluminanceSensorValue':{
            objectType:3301,
            objectInstance:0,
            objectResource:5700
            },
        'temperature': {
            objectType: 3303, 
            objectInstance: 1,
            objectResource: 5700
            },
        'humidity': {
            objectType: 3304,
            objectInstance: 1,
            objectResource: 5700
            },
  'IPSOAccelerometerXValue':{
            objectType:3313,
            objectInstance:0,
            objectResource:5702
            },
        'IPSOAccelerometerYValue':{
            objectType:3313,
            objectInstance:0,
            objectResource:5703
            },
        'IPSOAccelerometerZValue':{
            objectType:3313,
            objectInstance:0,
            objectResource:5704
            },
        'IPSOPressureSensorValue':{
            objectType:3323,
            objectInstance:0,
            objectResource:5700
            },
  'IPSOConcentrationSensorValue0':{
            objectType:3325,
            objectInstance:0,
            objectResource:5700
            },
        'IPSOConcentrationSensorValue1':{
            objectType:3325,
            objectInstance:1,
            objectResource:5700
            },
        'IPSOConcentrationSensorValue2':{
            objectType:3325,
            objectInstance:2,
            objectResource:5700
            },
        'IPSOConcentrationSensorValue3':{
            objectType:3325,
            objectInstance:3,
            objectResource:5700
            },
  'NearWiFiDevicesLastDeviceinformation':{
            objectType:10001,
            objectInstance:0,
            objectResource:0
            },
        'NearWiFiDevicesDevicesfoundinthelastmin':{
            objectType:10001,
            objectInstance:0,
            objectResource:1
            },
        'NearWiFiDevicesDevicesfoundinthelast10min':{
            objectType:10001,
            objectInstance:0,
            objectResource:2
            },
        'NearWiFiDevicesDevicesfoundinthelasthour':{
            objectType:10001,
            objectInstance:0,
            objectResource:3
            },
  'physicalUrl': { 
      objectType: 10000,
      objectInstance: 0,
      objectResource: 0
  },
  'IPSODigitalOutputDigitalOutputState0':{
            objectType:3201,
            objectInstance:0,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState1':{
            objectType:3201,
            objectInstance:1,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState2':{
            objectType:3201,
            objectInstance:2,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState3':{
            objectType:3201,
            objectInstance:3,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState4':{
            objectType:3201,
            objectInstance:4,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState5':{
            objectType:3201,
            objectInstance:5,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState6':{
            objectType:3201,
            objectInstance:6,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState7':{
            objectType:3201,
            objectInstance:7,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState8':{
            objectType:3201,
            objectInstance:8,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState9':{
            objectType:3201,
            objectInstance:9,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState10':{
            objectType:3201,
            objectInstance:10,
            objectResource:5550
            },
        'IPSODigitalOutputDigitalOutputState11':{
            objectType:3201,
            objectInstance:11,
            objectResource:5550
            },
  'NearWiFiDevicesRestrictdetectionwithRSSIthreshold':{
            objectType:10001,
            objectInstance:0,
            objectResource:5
            },
        'WLANConnectivitySSID':{
            objectType:12,
            objectInstance:0,
            objectResource:5
            },        
  'WLANConnectivityWPAPreSharedKey':{
            objectType:12,
            objectInstance:0,
            objectResource:17
            }

            }
        }
    },
    service: 'SmartSpot',
    subservice: '/smartspot',
    providerUrl: 'http://iotagent:4042',
    deviceRegistrationDuration: 'P1M'
};

module.exports = config;