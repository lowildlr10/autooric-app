import { Typography, Stack, Divider, Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const TitleSection = () => {
  return (
		<Stack>
			<Stack
				direction='row'
				gap={4}
				mb={{ xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 }}
				justifyContent='center'
				pt={{ xs: 10, sm: 15, md: 20, lg: 25, xl: 35 }}
			>
				<Box
					sx={{  
						'&>img': {
							width: { xs: '30px', md: '35px', lg: '40px', xl: '45px' },
							height: { xs: '50px', md: '55px', lg: '60px', xl: '65px' },
						}
					}}
				>
					<Image 
						src='/images/pnp-logo.png' 
						alt='logo' 
						width={45} 
						height={65} 
					/>
				</Box>
				<Box
					sx={{  
						'&>img': {
							width: { xs: '50px', md: '55px', lg: '60px', xl: '65px' },
							height: { xs: '50px', md: '55px', lg: '60px', xl: '65px' },
						}
					}}
				>
					<Image 
						src='/images/pnp-finance-logo.png' 
						alt='logo' 
						width={65} 
						height={65} 
					/>
				</Box>
			</Stack>
			<Typography 
				variant='h5' 
				textAlign='center'
				fontWeight='bold'
				fontSize={{ xs: '1.2rem', md: '1.6rem', lg: '2rem', xl: '2.3rem' }}
			>AUTOMATED<br />OFFICIAL RECEIPT<br />ISSUANCE AND COLLECTION</Typography>

			<Divider 
				sx={{ 
					border: '1px white solid',
					mt: {xs: 5, md: 6, lg: 7, xl: 8},
					mb: {xs: 1, md: 1.5, lg: 2, xl: 2.5}, 
					width: '100%'
				}} 
			/>

			<Typography 
				variant='body2' 
				textAlign='center'
				fontSize={{ xs: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' }}
			>v1.0.0</Typography>
		</Stack>
  )
}

export default TitleSection