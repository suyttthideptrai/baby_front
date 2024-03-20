import React from 'react';
import ErrorImage from '../../assets/icons/sidebar/financialPlanning_x2.svg'
export default function Popup({ title, isShow, setIsShow, message, okCallback, error }) {

    const handleCancelClick = () => {
        setIsShow(false);
    }
    const handleOK = () => {
        setIsShow(false);
        if (okCallback) {
            okCallback();
        }
    }
    if (!isShow) return null;
    return (
        <div className="popup">
            <div className="background" onClick={handleCancelClick}></div>
            <div className="popup-content">
                <div className="popup-title">
                    <p className='title'>{title}</p>
                    <p className='exit-btn' onClick={handleCancelClick}>&times;</p>
                </div>
                {error &&
                    <div className="popup-icon">
                        <img src={ErrorImage} alt="" />
                    </div>
                }
                <div className='popup-message'>
                    <p>{message}</p>
                </div>
                <div className="btn-container">
                    <p className='ok-btn' onClick={handleOK}>Ok</p>
                    <p className='cancel-btn' onClick={handleCancelClick}>Cancel</p>
                </div>
            </div>

        </div>
    )
}