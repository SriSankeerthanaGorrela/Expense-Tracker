1️⃣ JSON.stringify() and JSON.parse()
2️⃣ How data flows from Frontend → Backend → Database → Back again to Frontend

🧠 JavaScript Data Flow & JSON Notes
🔹 1. Understanding JSON

JSON (JavaScript Object Notation) is a lightweight data format used for exchanging data between the frontend, backend, and database.

Example of JSON data:

{
  "name": "Sankeerthana",
  "email": "sankeerthana@gmail.com",
  "age": 23
}

🔹 2. JSON.stringify() — Convert JS Object ➜ JSON String

Converts a JavaScript object into a string so that it can be stored or sent over the network.

Local storage and APIs only store text, not objects — so we use this.

Example:

const user = { name: "Sankeerthana", age: 23 };
const jsonString = JSON.stringify(user);
console.log(jsonString); // '{"name":"Sankeerthana","age":23}'


✅ Used when:

Saving to localStorage

Sending data to backend APIs

🔹 3. JSON.parse() — Convert JSON String ➜ JS Object

Converts a JSON string back into a JavaScript object.

Used when reading data from localStorage or from a backend response.

Example:

const storedData = '{"name":"Sankeerthana","age":23}';
const userObj = JSON.parse(storedData);
console.log(userObj.name); // "Sankeerthana"


✅ Used when:

Reading from localStorage

Handling API responses from backend

🔹 4. Data Flow: Frontend ➜ Backend ➜ Database ➜ Backend ➜ Frontend

Let’s understand step-by-step how data travels in a full-stack app.

🧩 Step 1: Frontend (React, Next.js, etc.)

The user fills a form and clicks Login:

const userData = {
  email: "sankeerthana@gmail.com",
  password: "12345"
};


When submitting:

await fetch("http://localhost:8080/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(userData)  // Convert JS object → JSON string
});


➡️ Data is sent to backend as JSON text.

⚙️ Step 2: Backend (Spring Boot, Node.js, etc.)

The backend receives the JSON string and parses it into an object:

@PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User user) {
    // Here @RequestBody automatically parses JSON → Java Object
    // Example: user.getEmail() = "sankeerthana@gmail.com"
}


➡️ Backend validates credentials and checks the database.

🗄️ Step 3: Database (MySQL, MongoDB, etc.)

Backend queries the database:

SELECT * FROM users WHERE email='sankeerthana@gmail.com';


If found and password matches, backend returns a response:

{
  "status": "success",
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Sankeerthana",
    "email": "sankeerthana@gmail.com"
  },
  "token": "abc123xyz"
}

🔁 Step 4: Backend ➜ Frontend

The backend sends JSON data as the response:

return ResponseEntity.ok(userResponse);


On frontend:

const res = await fetch("http://localhost:8080/api/login", { ... });
const data = await res.json();  // JSON.parse() under the hood
console.log(data.user.name); // "Sankeerthana"


Now you can:

Store user info in Zustand or Redux state.

Also store it in localStorage for persistence:

localStorage.setItem("userData", JSON.stringify(data.user));

🔹 5. How It All Connects Together
Step	Layer	Format	Example
1	Frontend	JS Object → JSON (via JSON.stringify)	Sending login form data
2	Backend	JSON → Object (via @RequestBody or JSON.parse)	Validates data
3	Database	Stores data in structured format	SQL/Mongo document
4	Backend Response	Object → JSON	Sends response back
5	Frontend	JSON → Object (via res.json() or JSON.parse)	Updates UI
🔹 6. Summary
Function	Purpose	Example
JSON.stringify(obj)	Convert JS Object → JSON String	Save in localStorage or send to API
JSON.parse(str)	Convert JSON String → JS Object	Read from localStorage or API
localStorage	Persistent storage on browser	Remains even after reload
Zustand / Context / Redux	State management within React	Lost on refresh unless persisted

✅ In short:

Frontend → Backend = use JSON.stringify()

Backend → Frontend = receive data as JSON, use res.json() (auto-parsed)

Frontend persistent state = store data in localStorage

Frontend app-wide state = manage via Zustand / Context / Redux