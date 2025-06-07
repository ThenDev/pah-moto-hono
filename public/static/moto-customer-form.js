function formStepper() {
  return {
    step: 1,
    form: {
      name: "",
      phone: "",
      postcode: "",
    },
    nextStep() {
      this.step++;
    },
    submitForm() {
      fetch("/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to submit");
          this.step++;
        })
        .catch((err) => {
          console.error(err);
          alert("Something went wrong.");
        });
    },
  };
}
