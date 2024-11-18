import React, { useState, useEffect } from 'react';

// Import images dynamically with glob
const images = import.meta.glob('./images/*.{png,jpeg,jpg,webp}');

export const Image = ({ imageName, ...prop }) => {
    // stateful variable to hold the image url
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        // Check if imageName exists and if it has been imported by the glob
        if (imageName && images[`./images/${imageName}`]) {
            // Dynamically fetch the image using the glob function
            images[`./images/${imageName}`]()
                .then((img) => {
                    // Construct the image source with transformations
                    const transformedImageUrl = `${img.default}?format=webp`;
                    setImageSrc(transformedImageUrl);
                })
                .catch((error) => console.error('Error loading image:', error));
        }
    }, [imageName]);

    return (
        imageSrc 
            ? <img src={imageSrc} alt={imageName} {...prop} /> 
            : <img src="" alt={imageName.split('.')[0]} />
    );
};
