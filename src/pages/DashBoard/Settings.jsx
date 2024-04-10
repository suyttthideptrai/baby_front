import React from 'react'
import PropTypes from 'prop-types'
import HelpIcon from '../../assets/icons/settings/help_icon.svg'
import MoonIcon from '../../assets/icons/settings/moon_icon.svg'
import ReportIcon from '../../assets/icons/settings/report_icon.svg'
import ShieldIcon from '../../assets/icons/settings/privacy_icon.svg'
import TermIcon from '../../assets/icons/settings/term_icon.svg'


const Settings = () => {
    const settingsElm = [
        {
            title: 'Help & Support',
            icon: HelpIcon,
            onClick: () => console.log('Profile clicked'),
            css: ''
        },
        {
            title: 'Display & Accessibility',
            icon: MoonIcon,
            onClick: () => console.log('Profile clicked'),
            css: ''
        },
        {
            title: 'Company Regulation',
            icon: ReportIcon,
            onClick: () => console.log('Profile clicked'),
            css: ''
        },
        {
            title: 'Privact Policy',
            icon: ShieldIcon,
            onClick: () => console.log('Profile clicked'),
            css: ''
        },
        {
            title: 'Term of Use',
            icon: TermIcon,
            onClick: () => console.log('Profile clicked'),
            css: ''
        },
    ];
  return (
    <div className='w-[230px] h-fit rounded-lg p-2 bg-white'>
        <div className='w-full'>
            {settingsElm.map((setting, index) => (
                <SettingItem 
                    key={index} 
                    title={setting.title} 
                    icon={setting.icon} 
                    onClick={setting.onClick} 
                    css={setting.css} 
                />
            ))}
        </div>
        <p className='text-sm text-right p-1 mr-3'>
            BabySmile @ 2025
        </p>
    </div>
  )
}

const SettingItem = ( {icon, title, onClick, css} ) => {
    const handleOnclick = () => {
        onClick()
        console.log('onClick')
    }
    return (
        <div onClick={handleOnclick} 
        className={"w-full flex space-x-2 space-y-2 rounded-md hover:bg-gray-200 duration-200 cursor-pointer" + css}>
            <div className='p-2 bg-gray-200 rounded-full aspect-w-1 aspect-h-1'>
                <img className='w-4' src={icon} alt="" />
            </div>
            <span>{title}</span>
        </div>
    )
}

export default Settings

SettingItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    css: PropTypes.string,
    onClick: PropTypes.func
  };