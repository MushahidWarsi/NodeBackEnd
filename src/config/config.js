

//Testing Purpose
const config = {
  server: '192.168.12.174',      // if it does not work try- localhost  
  database: 'AL_Accounts',
  user: 'sql',
  password: 'sql2014',
  options: {
    encrypt: false
    //,trustedconnection: true
    , enableArithAbort: true
    //,instancename:  'DEV-11'  
  },
  port: 1433      //Database Port
}

export default config;