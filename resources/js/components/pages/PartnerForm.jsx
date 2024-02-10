import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { notification } from 'antd';

function PartnerForm(props) {
    const [partner, setPartner] = useState({})
    const [hasError, setHasError] = useState(false)

    const openNotification = () => {
        notification.success({
            message: text.feedback,
            description: text.feedbackInstruction
        });
    };

    useEffect(() => {
        var partnerUrl = props.match.params.partnerUrl;

        axios.get(`${window.location.origin}/api/partner-from-url/?url=${partnerUrl}`).then((response) => {
            setPartner(response.data.data);
        }).catch((error) => {
            // notification.error({
            //     message: text.error,
            //     description: text.errorInstruction
            // });
            setHasError(true);
        })

    }, [])

    return (
        <div>PartnerForm</div>
    )
}

export default PartnerForm