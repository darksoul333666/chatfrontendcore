const propertiesIcon = {
    width:25,
    heigth:25,
    borderRadius:"25%"
}

const propertiesIconNotSpeaking = {
  width:80,
  heigth:75,
  marginTop:10
}

const propertiesIconSpeaking = {
  width:120,
  marginLeft:10,
  marginBottom:-10
}

const propertiesIconSend = {
  width:55,
  heigth:55,
}




export const DoctorIcon = () => (
    <img src={require('./doctor.svg').default} style={propertiesIcon} alt="Doctor Icon" />
  );
  
  export const EngineerIcon = () => (
    <img src={require('./engineer.svg').default} style={propertiesIcon} alt="Engineer Icon" />
  );
  
  export const PhysicistIcon = () => (
    <img src={require('./physicist.svg').default} style={propertiesIcon} alt="Physicist Icon" />
  );

  export const LawyerIcon = () => (
    <img src={require('./lawyer.svg').default} style={propertiesIcon} alt="Lawyer Icon" />
  );

  export const InvestorIcon = () => (
    <img src={require('./investor.svg').default} style={propertiesIcon} alt="Investor Icon" />
  );

  export const TherapistIcon = () => (
    <img src={require('./therapist.svg').default} style={propertiesIcon} alt="Therapist Icon" />
  );

  export const BotIconSpeaking = () => (
    <img src={require('./BotSpeaking.png')} style={propertiesIconSpeaking} alt="Bot Icon" />
  );

  export const BotIconNotSpeaking = () => (
    <img src={require('./BotNotSpeaking.png')} style={propertiesIconNotSpeaking} alt="Bot Icon" />
  );

  export const SubmitIcon = () => (
    <img
      src={require('./BotonSubmityRecord.png')}
      style={{
        ...propertiesIconSend, 
        pointerEvents: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none', 
        MozUserSelect: 'none',
        msUserSelect: 'none', 
        userSelect: 'none',
      }}
      alt="Bot Icon"
    />
  );
  
  