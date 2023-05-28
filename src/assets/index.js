const propertiesIcon = {
    width:25,
    heigth:25,
    borderRadius:"25%"
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