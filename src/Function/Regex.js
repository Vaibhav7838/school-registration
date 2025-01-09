export const handleNumericInput = (e, setFormData) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 10) {
      setFormData(prevData => ({
        ...prevData,
        [e.target.name]: value
      }));
    }
  };
  