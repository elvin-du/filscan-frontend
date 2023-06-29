import React, { useState } from 'react';
import Image from 'next/image';
import { fvmUrl } from '@/contants/apiUrl';

const ImageWithFallback = (props:any) => {
    const { src, fallbackSrc =  fvmUrl + `/images/default.png`, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
};

export default ImageWithFallback;