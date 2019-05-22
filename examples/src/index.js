import React, { useState } from 'react';
import { render } from 'react-dom';
import ResponsiveAntMenu from '../../dist/ResponsiveAntMenu';
// import ResponsiveAntMenu from '../../src/ResponsiveAntMenu';

import { Menu, Switch, InputNumber } from 'antd';
// include Menu & Popover styles if not not using already
// import 'antd/lib/menu/style/css';
// import 'antd/lib/popover/style/css';

const App = () => {
    const LIGHT = 'light';
    const DARK = 'dark';
    const VERTICAL = 'vertical';
    const HORIZONTAL = 'horizontal';
    const BOTTOM = 'bottom';
    const RIGHT = 'right';

    const [desktopTheme, setDesktopTheme] = useState(LIGHT);
    const [mobileTheme, setMobileTheme] = useState(DARK);
    const [closeOnClick, setCloseOnClick] = useState(true);
    const [mobileBreakpoint, setMobileBreakpoint] = useState(575);
    const [viewMode, setViewMode] = useState(HORIZONTAL);
    const [menuPosition, setMenuPosition] = useState(RIGHT);

    const handleDesktopThemeChange = (checked) => setDesktopTheme(checked ? DARK : LIGHT);
    const handleMobileThemeChange = (checked) => setMobileTheme(checked ? DARK : LIGHT);
    const handleCloseOnClick = (checked) => setCloseOnClick(checked);
    const handleMobileBreakpointChange = (value) => setMobileBreakpoint(value);
    const handleViewMode = (checked) => setViewMode(checked ? VERTICAL : HORIZONTAL);
    const handleMenuPosition = (checked) => setMenuPosition(checked ? BOTTOM : RIGHT);

    return (<>
        <div>
            <h1>Responsive Ant Menu Preview</h1>
            <h2>Options</h2>
            <ul>
                <li><b>Desktop theme:</b>&nbsp;<i>light</i> <Switch onChange={handleDesktopThemeChange}/> <i>dark</i></li>
                <li><b>Mobile theme:</b>&nbsp;<i>light</i> <Switch defaultChecked onChange={handleMobileThemeChange}/> <i>dark</i></li>
                <li><b>Close Mobile Menu on Link Click:</b>&nbsp;<i>off</i> <Switch defaultChecked onChange={handleCloseOnClick}/> <i>on</i></li>
                <li><b>Mobile Breakpoint (px):</b>&nbsp;<InputNumber min={250} max={1024} defaultValue={575} onChange={handleMobileBreakpointChange} /></li>
                <li><b>View Mode:</b>&nbsp;<i>horizontal</i> <Switch onChange={handleViewMode}/> <i>vertical</i></li>
                <li><b>Mobile Menu position:</b>&nbsp;<i>right</i> <Switch onChange={handleMenuPosition}/> <i>bottom</i></li>
            </ul>
        </div>

        <h2>Preview</h2>
        <ResponsiveAntMenu
            activeLinkKey={location.pathname} // to be used with eg. React Router
            mobileMenuContent={isMenuShown => isMenuShown ? <button>Close</button> : <button>Open</button>}
            mobileBreakPoint={mobileBreakpoint}
            // throttleViewportChange={250}
            theme={isMobile => isMobile ? mobileTheme : desktopTheme}
            placement={menuPosition} // placement={'right'}
            mode={viewMode} // mode={isMobile => isMobile ? 'vertical' : 'horizontal'}
            closeOnClick={closeOnClick}
            menuClassName={'menu-wrapper'}
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
    </>);
};

render(<App/>, document.getElementById('root'));
