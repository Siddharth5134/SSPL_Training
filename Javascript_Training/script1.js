function submitForm() {
    const form = document.getElementById('form');
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;

    console.log("Form Submitted Successfully!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Gender:", gender);
}