# DirectX 11 Initialization

*In this blog we are going to discuss Initialization of DirectX 11*

June 18, 2025

![com](../assets/init.jpg)

`ID3D11Device` usaslly represents a display adapter (ie. graphics Card). Its main function is to create varous resources. The most commonly used resources are: resource class (`ID3D11Resource`, including Textures and Buffers), view class and shaders. In addition, Device can also be used to detect the system supported functions.

`ID3D11DeviceContext` can be regraded as a rendering pipeline. Usually when we create D3D device, we will also give it an *immediate device context*. A Device corresponds to only one immediate device context. As long as we have one of then we can obtain the others (ie. `ID3D11Device::GetImmediateContext` and `ID3D11DeviceContext::GetDevice`) through their repective methods. The rendering pipeline is mainly responsible for rendering and calculation work. It needs to bind many resources, views and shaders created by device associated with it to operate normally. In addition, it is also reponsible for direct read and write operations on resources. If your system supports D3D11.1, the corresponding interface classes are: `ID3D11Device1` and `ID3D11DeviceContext1` which inhering from the above two interface classes respectively. The diffrence is that a few new interfaces are provided additionally, and the implementation of interface methods may be diffrent.

In order to create a device and device Context we will be using `D3D11CreateDevice()`

```cpp
D3D11CreateDevice(
    pAdapter, 
    DriverType,
    Software, // If the driver type is D3D_DRIVER_TYPE_SOFTWARE, the program module must be provided
    Flags, 
    pFeatureLevels,
    SDKVersion,
    ppDevice,
    pFeauterLevel, // Output the current application's D3D Feature Level
    ppImmediateDeviceContext
);
```

Regarding `pAdapter` (display adapter), we can think of it as a layer of encapsulation for the display card device. Through this parameter, we can specify which display card device to use. Usually we set this parameter to   `nullptr` , so that the upper driver can help us decide which graphics card to use, or set which graphics card to use in the current program in the NVIDIA control panel . If you want to decide at the application level, use the `IDXGIFactory::EnumAdapters` method to enumerate the currently available display card devices.

Driver Type specifies the driver type, but for most cases usually `D3D_DRIVER_TYPE_HARDWARE` is used to enjoy the benifits of hardware acceleration. Now we create a driver array and then poll it ourselves using a `for` loop

```cpp
D3D_DRIVER_TYPE driverTypes[] = 
{
    D3D_DRIVER_TYPE_HARDWARE,
    D3D_DRIVER_TYPE_WARP,
    D3D_DRIVER_TYPE_REFERENCE,
};

UINT numDriverTypes = ARRAYSIZE(driverTypes);
```

If hardware drivers are not supported then you need to check if warp driver is supported in a loop. Usually, hardware drivers are not supported in VMs.

The we set the `CREATE_DEVICE_FLAGS` with the corresponding enumeration values. If D3D Device Debugging is required, we use `D3D11_CREATE_DEVICE_DEBUG` enumeration value. After specifing this value you can observe the information in the debug output window when a program exception occurs.

`pFeatureLevels` is an array of features that is polled inside the function to detect supported feature levels:

```cpp
D3D_FEATURE_LEVEL featureLevels[] = 
{
    D3D_FEATURE_LEVEL_11_1,
    D3D_FEATURE_LEVEL_11_0
};

UINT numFeatureLevels = ARRAYSIZE(featureLevels);
```

If the system supports D3D11.1 API but the feature level is set to `nullptr`, `D3D11CreateDevice` will create a device with feauture level `D3D_FEATURE_LEVEL_11_0`. If you system does not support D3D11.1 API, it will return `E_INVALIDARGS` from `D3DCreateDevice`. In order to avoid this you should start polling with `D3D11_FEATURE_LEVEL_11_0` or lower.

So, we can see that the feature level and the version of D3DDevice dont correspond to each other.

1. The feature level support depends on the currently used display adapter. As long as the display adapter supports a certain feature level, it means that it can support the unified functions under that feature level.

2. The version of D3DDevice depends on the systems (sometimes one can install a specific system patch to support higher versions of DirectX.)

Since this function can create D3DDevice and D3DDeviceContext of D3D11.0 or higher sub-versions, but all output `ID3D11Device` and `ID3D11DeviceContext` uniformly, if you want to check which sub-version was selected you can use the following method.

```cpp
ComPtr<ID3D11Device1> device1;
HRESULT hr = device.As(&device1);
```

Similarly if you want to check if D3D11.2 API is supported you can do:

```cpp
ComPtr<ID3D11Device2> device2;
HRESULT hr = device.As(&device2);
```

Since the display card device of each computer is diffrent, we will use default one for now.

```cpp
HRESULT hr = 0; 
UINT createDeviceFlags = 0;
#if defined(DEBUG) || defined(_DEBUG)
createDeviceFlags |= D3D11_CREATE_DEVICE_DEBUG
#endif

D3D_DRIVER_TYPE driverTypes[]
{
    D3D_DRIVER_TYPE_HARDWARE,
    D3D_DRIVER_TYPE_WARP,
    D3D_DRIVER_TYPE_REFRENCE,
};

UINT numDriverTypes = ARRAYSIZE(driverTypes);

D3D_FEATURE_LEVEL featureLevels[]
{
    D3D_FEATURE_LEVEL_11_1,
    D3D_FEATURE_LEVEL_11_0,
};

UINT numFeatureLevels = ARRAYSIZE(featureLevels);

D3D_FEATURE_LEVEL featureLevel;
D3D_DRIVER_TYPE driverType;

for(UINT driverIndex = 0; driverIndex < numDriverTypes; driverIndex++)
{
    hr = D3D11CreateDevice(nullptr, driverTypes, nullptr, createDeviceFlags, featureLevels, numFeatureLevels, D3D11_SDK_VERSION, device.GetAddressOf(), &featureLevel, immediateContext.GetAddressOf());

    if(hr == E_INVALIDARGS)
    {
        // d3d11.0 api does not recognzed the D3D_FEATURE_LEVEL_11_1 so we need to try feature levels 11.0 and below.
        hr = D3D11CreateDevice(nullptr, driverTypes, nullptr, createDeviceFlags, &featureLevels[1], numFeatureLevels-1, D3D11_SDK_VERSION, device.GetAddressOf(), &featureLevel, immediateContext.GetAddressOf());
    }

    if(SUCCEEDED(hr))
    {
        break;
    }
}

if(FAILED(hr))
{
    MessageBoxA(0, "Device Creation Failed", 0, 0);
}

if(featureLevel != D3D_FEATURE_LEVEL_11_0 && featureLevel != D3D_FEATURE_LEVEL_11_1)
{
    MessageBoxA(0, "D3D11 Not supported", 0, 0);
}

// detect the quality level supported by MSAA

device->CheckMultiSampleQualityLevels(
    DXGI_FORMAT_R8G8B8A8_UNORM, 4, &msaaQuality 
);

assert(msaaQuality > 0);
```
