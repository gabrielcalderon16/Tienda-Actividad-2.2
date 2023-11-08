import { Grid } from "@mui/material"
import './checkingAuth.css'

export const CheckingAuth = () => {
  return (
   <>
         <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight:'100vh', backgroundColor:'primary.main', padding:4}}
        >
                <Grid
                container
                direction='row'
                justifyContent='center'
                >

                    <div className="lds-heart"><div></div></div>

                </Grid>
        </Grid>
   </>
  )
}
