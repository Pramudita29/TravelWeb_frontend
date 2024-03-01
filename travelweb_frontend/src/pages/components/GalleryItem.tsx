import React from 'react';
import './css/GalleryItem.css';

const GalleryItem: React.FC = () => {
    return (
        <>
            <div className="category-main">
            <div className="categories-title">
                <h2>Popular Destinations</h2>
                <p> Nepal's best tourist destinations</p>
            </div>

                <div className="categories-grid">
            <div className="category" style={{ backgroundImage: 'url(Lumbini.jpeg)' }}>
                <a className="tour_image" href="../Category/ExperienceCulture"></a>
                <div className="info_wrapper">
                    <div className="info_content">
                        <h3>Experience Culture</h3>
                    </div>
                </div>
            </div>
                <div className="category" style={{ backgroundImage: 'url(Chitwan.jpeg)' }}>
                    <a className="tour_image" href="../Category/ExperienceAdrenaline"></a>
                    <div className="info_wrapper">
                        <div className="info_content">
                            <h3>Experience Adrenaline</h3>
                        </div>
                    </div>
                </div>
                <div className="category" style={{ backgroundImage: 'url(Trail.jpg)' }}>
                    <a className="tour_image" href="../Category/ExperienceTrails"></a>
                    <div className="info_wrapper">
                        <div className="info_content">
                            <h3>Experience Trails</h3>
                        </div>
                    </div>
                </div>
                <div className="category" style={{ backgroundImage: 'url(Nature.jpeg)' }}>
                    <a className="tour_image" href="../Category/ExperienceNature"></a>
                    <div className="info_wrapper">
                        <div className="info_content">
                            <h3>Experience Nature</h3>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default GalleryItem;
