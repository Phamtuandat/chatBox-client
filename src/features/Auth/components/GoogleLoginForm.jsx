import { Box } from '@mui/system'
import PropTypes from 'prop-types'
import GoogleButton from 'react-google-button'
import GoogleLogin from 'react-google-login'

function GoogleLoginForm({ handleSubmit }) {
    const responseGoogle = async (res) => {
        handleSubmit(res)
    }
    return (
        <Box width={'30%'}>
            <GoogleLogin
                clientId="72378177918-kgipe8gf2a5k36ns2645ibqjan0sqf10.apps.googleusercontent.com"
                render={(renderProps) => (
                    <GoogleButton
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        style={{ width: '100%' }}
                        label="GOOGLE"
                        type="light"
                    />
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </Box>
    )
}

GoogleLoginForm.propTypes = {
    handleSubmit: PropTypes.func,
}

export default GoogleLoginForm
