export const login = credentials =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          token: '123456',
          user: {
            name: 'Bruno',
            email: 'dev@brunobertolini.com',
          },
        },
      })
    }, 3000)
  })


  /*
<Card>
                        <Card.Title title="Fluents" titleStyle={loginStyl.cardTitle} ></Card.Title>
                        <Card.Content>
                            <Formik
                                initialValues={{email: "" , password: ""}}
                                
                                onSubmit={logando => (logando())}>
                                    {({handleSubmit, handleChange}) => (
                                        <>
                                        <TextInput label="Email" 
                                        keyboardType="email-address"
                                        onChangeText={handleChange("email")} />
                                        
                                    <TextInput label="Password" secureTextEntry={true} onChangeText={handleChange("password")}/>
                                    <Button uppercase={false} style={loginStyl.cardButton} onPress={irForgot}>Forgot password</Button>
                                    <Button mode="contained" style={loginStyl.cardButton} onPress={handleSubmit}>Login</Button>
                                    <Button style={loginStyl.cardButton} onPress={() => irRegister()}>Register</Button>
                                    </>
                                   
                                
                                )}
                            </Formik>

                        </Card.Content>
                </Card>







  */