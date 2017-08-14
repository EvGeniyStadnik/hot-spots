# Hot Spots

### Small and easy solution to setup UI prototypes similar like in Invisionapp.

###### How to use:

```javascript
    spots.init({
        debug: false,            // set this as true to see all areas and current cursor coordinates
        title: '...',            // title of html page
        color: '...',            // hthe highlight color, use full HEX record like #ff00ff (all 6 digits and #)
        screen: '...',           // current screen (image) relative path
        clickableAreas: [        // list of clickable areas on this page
            {...},               // {x:0, y:0, width:10, height:10, href:'...link to next screen...'}
            {...},               // {x:0, y:0, x1:10, y1:10, href:'#'}
            ...                  // {x:0, y:0, x1:10, height:20, href:'#'}
        ]
    });
```

###### Modify options.js file to set same option value for all pages:

```javascript
    spotsOptions = {
        debug: true,
        title: 'My First Prototype!',
        color: '#ff0000'
    }
```


###### In debug mode use right mouse click to copy current coordinates to clipboard.

![](https://i.imgur.com/kPUEA7P.png)

---
