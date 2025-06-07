// /src/index.ts
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.html(/* html */ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Moto</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
      <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
      <script>
        function formStepper() {
          return {
            step: 1,
            form: {
              name: '',
              phone: '',
              postcode: ''
            },
            nextStep() {
              this.step++;
            },
            submitForm() {
              fetch('/api/customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.form)
              }).then(() => this.step++);
            }
          };
        }
      </script>
    </head>
    <body>
      <main class="container" x-data="formStepper()">
        <template x-if="step === 1">
          <form @submit.prevent="nextStep">
            <h2>Step 1: Customer Name</h2>
            <input type="text" x-model="form.name" placeholder="Full Name" required />
            <button type="submit">Next</button>
          </form>
        </template>

        <template x-if="step === 2">
          <form @submit.prevent="nextStep">
            <h2>Step 2: Phone Number</h2>
            <input type="tel" x-model="form.phone" placeholder="Phone" required />
            <button type="submit">Next</button>
          </form>
        </template>

        <template x-if="step === 3">
          <form @submit.prevent="nextStep">
            <h2>Step 3: Postcode</h2>
            <input type="text" x-model="form.postcode" placeholder="Postcode" required />
            <button type="submit">Next</button>
          </form>
        </template>

        <template x-if="step === 4">
          <form @submit.prevent="submitForm">
            <h2>Step 4: Confirm</h2>
            <ul>
              <li><strong>Name:</strong> <span x-text="form.name"></span></li>
              <li><strong>Phone:</strong> <span x-text="form.phone"></span></li>
              <li><strong>Postcode:</strong> <span x-text="form.postcode"></span></li>
            </ul>
            <button type="submit">Submit</button>
          </form>
        </template>

        <template x-if="step === 5">
          <article>
            <h2>Submitted</h2>
            <p>Customer information saved successfully.</p>
          </article>
        </template>
      </main>
    </body>
    </html>
  `);
});

app.post("/api/customer", async (c) => {
  const data = await c.req.json();
  console.log("Customer submitted:", data);
  return c.json({ ok: true });
});

export default app;
