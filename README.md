# Responsive Ant Menu

A lightweight React component for Ant Menu to support responsive behaviour.

## Motivation
Having an option for Ant's Menu component to hide under a customizable element when viewing on mobile device.

## How to use

1. `npm i responsive-ant-menu`
2. Optional: Configure your project to use [Modularized Ant](https://ant.design/docs/react/introduce#Use-modularized-antd) OR import the styles for Menu & Popover manually.

## Sample Usage
```js
import React from 'react';
import ResponsiveAntMenu from 'responsive-ant-menu'
import { Menu } from 'antd';
// include Menu & Popover styles if not not using Modularized Ant (see How to Use)
// import 'antd/lib/menu/style/css';
// import 'antd/lib/popover/style/css';

const Nav = () => (
    <ResponsiveAntMenu
    activeLinkKey={location.pathname}
    mobileMenuContent={isMenuShown => isMenuShown ? <button>Close</button> : <button>Open</button>}
    menuClassName={'responsive-ant-menu'}
    >
        {(onLinkClick) =>
            <Menu>
                <Menu.Item key='/' className={'menu-home'}>
                    <a onClick={onLinkClick} href={'/#'}>Home</a>
                </Menu.Item>
                <Menu.Item key='/#foo'>
                    <a onClick={onLinkClick} href={'/#foo'}>Foo</a>
                </Menu.Item>
                <Menu.Item key='/#bar'>
                    <a onClick={onLinkClick}  href={'/#bar'}>Bar</a>
                </Menu.Item>
            </Menu>
        }
    </ResponsiveAntMenu>
);
        
export default Nav;
```

## Props

Name | Type | Default | Desc
---- | ---- | ------- | ----
mobileMenuContent | `HTML` | - | **Required!** Custom content to be show when the viewport size hits mobileBreakPoint. Supply custom HTML markup. If a function is supplied, `isMenuShown` is passed as an argument to be used for even more customization eg. `mobileMenuContent={isMenuShown => isMenuShown ? <button>Close</button> : <button>Open</button>}` to show different content.
activeLinkKey | `string` | - | Pass either `location.pathname` or React Routers path string to mark Menu.Item with matching `key` prop as active
mobileBreakPoint | `number` | 575 | Whenever the size of the viewport gets equal to or less than passed value, display Mobile version toggle. Value is in px.
throttleViewportChange | `number` | 250 | Throttle the callback calls whenever the viewport is re-sized. Value is in milliseconds.
mode | `'vertical', 'horizontal'` | `'horizontal'` | Allows to switch to either horizontal or vertical version of Ant's menu implementation.
theme | `'light', 'dark'` | 'light' | Allows to set a theme of Ant's Menu component. If a function is passed, isMobile argument is supplied to implement custom logic, eg. `theme={isMobile => isMobile ? 'dark' : 'light'}`
placement | `string` | `'bottom'` | Allow to use various positions for Popover component, for more info, see: [Ant Design: Popover](https://ant.design/components/popover/#components-popover-demo-placement)
closeOnClick | `boolean` | `true` | Close the Mobile menu once the link is clicked
menuClassName | `string` | - | Add a custom CSS class to the Ant's Menu component
