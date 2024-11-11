import React from 'react';

import { useTranslation } from 'react-i18next';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Breadcrumbs, useTheme } from '@mui/material';
import { Link, useLocation } from '@tanstack/react-router';

function HomeBreadcrumbLink() {
    return (
        <Link
            to="/"
            style={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
                textDecoration: 'none'
            }}
        >
            <HomeRoundedIcon fontSize="small" />
        </Link>
    );
}

interface BreadCrumbLinkProps {
    text: string;
    to: string;
    isActive: boolean;
}

function BreadcrumbLink(props: BreadCrumbLinkProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Link
            to={props.to}
            style={{
                color: !props.isActive ? 'inherit' : theme.palette.primary.main,
                textDecoration: 'none'
            }}
        >
            {t(`translation:breadcrumbs.${props.text}`, { defaultValue: props.text })}
        </Link>
    );
}

export default function AppBreadcrumbs() {
    const location = useLocation();

    const pathElements = location.pathname.split('/');

    return (
        <Breadcrumbs
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
                alignContent: 'center'
            }}
        >
            {pathElements.map((pathElement, index) => {
                const isRoot = index === 0;
                const isActive = index === pathElements.length - 1;
                const to = pathElements.slice(0, index + 1).join('/');

                return isRoot ? (
                    <HomeBreadcrumbLink key={index} />
                ) : (
                    <BreadcrumbLink key={index} text={pathElement} to={to} isActive={isActive} />
                );
            })}
        </Breadcrumbs>
    );
}
