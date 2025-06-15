# IUnkown Interface Class

*In this blog we are going to discuss COM and Smart COM Pointers*

June 15, 2025

![com](../assets/com.jpg)

DirectX 11 API is managed by a series of COM components. These clases prefixed with I ultimately inherit from `IUnkown` interface class. `IUnknown` has three methods

1. `AddRef()` The internal reference count is incremented by 1. This method should be called after each copy of such a pointer to ensure the count is correct.

2. `QueryInterface()` It checks if the instance implements other interface. If so, returns a pointer to the interface and increase the refrence count by 1.

3. `Release()` The internal reference count is reduced by 1. Only when the internal refrence count reaches 0 it is released.

In actual usage we rearely use the first method. The third method is the most commonly used. After each use of the instance we must use a macro like this following to release it.

```cpp
#define RELEASE(x) { if(x) { x->Release(); x = nullptr}};
```

And if one forgets to release an interface pointer, the memory leak may take a lot of time to debug

## ComPtr smart pointer

In order to solve the above issue and get rid of complicaed manual release, smart pointerfs are used. They can help us manage the interface instances implemented by COM components without worrying too much about memory leaks. The size of smart pointer is consitent witht the size of the general pointer. Therefore no addition space is occupied. Using the smart pointer requires including `wrl/clinet.h` and the smart pointer class template `ComPtr` is located inside the namespace `Microsoft::Wrl`

First there are five more commonly used methods to understand.

1. `Get()` This method return`T*` and doesnt trigger refrence count to increase by 1. It's commonly used in function input of COM compnent interface.

2. `GetAddressOf()`: Returns `T**`. Commonly used in COM component interfaces as output argument to a function.

3. `Reset()` This method calls release method on the instance inside and set the pointer to `nullptr`

4. `ReleaseAndGetAddressOf()` This method is equivalent to calling `Reset()` first and then `GetAddressOf()` to get `T**`. Its often used in function output of the COM component interface and is suitable for situations where the instance may be constructed repeatedly.

5. `As()` A template function that can be called instead `IUnkown::QueryInterface()` and needs to pass the address of a `ComPtr` instance.

There are some operator overloading but its not suggested to use it.  

Below is an example usage of ComPtr

```cpp
struct app
{
    template<class T>
    using ComPtr = Microsoft::WRL::ComPtr<T>
    ComPtr<ID3D11Device> device;
    ComPtr<ID3D11DeviceContext> deviceContext;
    ComPtr<IDXGISwapChain> swapChain;
    ComPtr<ID3D11Texture2D> depthStencilBuffer;
    ComPtr<ID3D11RenderTargetView> renderTargetView;
    ComPtr<ID3D11DepthStencilView> depthStencilView;
    D3D11_VIEWPORT viewPort;

    std::string mainWindowCaption;
    int width;
    int height;
};
```
