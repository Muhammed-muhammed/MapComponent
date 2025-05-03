// @ts-ignore
import React, {useEffect, useRef, useState} from 'react';
import ButtonPanel from '@core/component/button/ButtonPanel';
import Column from '@core/component/Column';
import RowContainer from '@core/component/RowContainer';
import {Box, Link} from '@mui/material';

export const MapComponent = ({lat, lng}) => {
	const [mapImage, setMapImage] = useState(null);
	const [locationData, setLocationData] = useState(null);
	const [routes, setRoutes] = useState(null);
	const [showBox, setShowBox] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [screenHeight, setScreenHeight] = useState(window.innerHeight);
	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
			setScreenHeight(window.innerHeight);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Conditionally set width parameter based on screen size
	let widthParam = screenWidth > 1000 ? (screenWidth - 64) : (screenWidth - 32);
	let heightParam;
	if (screenWidth > 800) {
		heightParam = 300;
	} else if (screenWidth > 400 && screenWidth < 500) {
		heightParam = 300;
	} else if (screenWidth > 500 && screenWidth < 800) {
		heightParam = 250;
	} else if (screenWidth < 400) {
		heightParam = 250;
	}
	useEffect(() => {
		fetchData(lat, lng);
	}, [lat, lng, screenWidth]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowBox(true);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);
	const fetchData = async (lat, lng) => {
		try {
			const apiKey = 'YOUR_NESHAN_API_KEY';
			const myLocationLat = '35.763057';
			const myLocationLng = '51.419387';

			// Fetch map image
			const mapResponse = await fetch(`https://api.neshan.org/v4/static?key=${apiKey}&type=neshan&width=${screenWidth > 720 ? 600 : 300}&height=${heightParam}&zoom=12&center=${lat}%2C${lng}&markerToken=27818.dkEsFiPf5`);
			if (!mapResponse.ok) throw new Error('Failed to fetch map image');
			const mapBlob = await mapResponse.blob();
			const mapUrl = URL.createObjectURL(mapBlob);
			setMapImage(mapUrl);

			// Fetch reverse geocoding data
			const locationResponse = await fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`, {
				method: 'GET',
				headers: {
					'Api-Key': apiKey,
				},
			});
			if (!locationResponse.ok) throw new Error('Failed to fetch location data');
			const locationData = await locationResponse.json();
			setLocationData(locationData);


		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	return (
		<Box style={{margin: '0 1rem'}}>
			<RowContainer numberOfColumns={1}>
				<ButtonPanel horizontalAlignment={'end'}>
				</ButtonPanel>
				<Box display="flex" alignItems="center" justifyContent="center">

					{showBox ?
						<Column
							value={<Link rel="noopener noreferrer" 	target="_blank"
										 href={`https://www.google.com/maps?q=${lat},${lng}`}>
								{mapImage && <img style={{borderRadius: '10px'}}  src={mapImage} alt="Map"/>}

							</Link>}
						>
						</Column>
						: <div className={'map-loader'}></div>}
				</Box>
			</RowContainer>
		</Box>
	);
};