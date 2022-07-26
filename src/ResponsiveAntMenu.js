import React, { useEffect, useState } from 'react';
import { number, string, func, oneOfType, bool, oneOf, object } from 'prop-types';
import { Popover } from 'antd';
import throttle from 'lodash.throttle';

const ResponsiveAntMenu = (props) => {
    const {
        children: MenuMarkup, activeLinkKey, menuClassName: className, popoverProps,
        theme, mode, mobileMenuContent, placement, popoverTrigger,
        throttleViewportChange, mobileBreakPoint, closeOnClick
    } = props;

    const [viewportWidth, setViewportWidth] = useState(0);
    const [isMenuShown, setIsMenuShown] = useState(false);
    const isMobile = () => viewportWidth < mobileBreakPoint;
    const onLinkClick = () => () => isMobile() && closeOnClick ? setIsMenuShown(false) : null;

    useEffect(() => {
        setViewportWidth(window.innerWidth);
        const throttledSetViewPortWidth = throttle(() => setViewportWidth(window.innerWidth), throttleViewportChange);
        window.addEventListener('resize', throttledSetViewPortWidth);

        return () => window.removeEventListener('resize', throttledSetViewPortWidth);
    }, []);

    const MenuMarkupConfig = {
        theme: !theme ? 'light' : typeof theme === 'function' ? theme(isMobile()) : theme,
        mode: !mode ? 'horizontal' : typeof mode === 'function' ? mode(isMobile()) : mode,
        selectedKeys: [`${activeLinkKey}`],
        className,
    };

    const menuToRender = React.cloneElement(MenuMarkup(onLinkClick()), MenuMarkupConfig);

    return isMobile() ?
        <Popover
            content={menuToRender}
            trigger={popoverTrigger}
            placement={placement}
            visible={isMenuShown}
            onVisibleChange={setIsMenuShown}
            {...popoverProps}
        >
            {mobileMenuContent(isMenuShown)}
        </Popover> : menuToRender;
};

ResponsiveAntMenu.propTypes = {
    children: func.isRequired,
    mobileBreakPoint: number,
    closeOnMobileLinkClick: bool,
    throttleViewportChange: number,
    activeLinkKey: string,
    placement: string,
    theme:  oneOfType([
        func,
        string
    ]),
    mode: oneOfType([
        func,
        string
    ]),
    mobileMenuContent: func.isRequired,
    menuClassName: string,
    popoverProps: object,
    popoverTrigger: oneOf(['click', 'hover', 'focus'])
};

ResponsiveAntMenu.defaultProps = {
    mobileBreakPoint: 575,
    throttleViewportChange: 250,
    placement: 'bottom',
    closeOnClick: true,
    popoverTrigger: 'click',
};

export default ResponsiveAntMenu;
