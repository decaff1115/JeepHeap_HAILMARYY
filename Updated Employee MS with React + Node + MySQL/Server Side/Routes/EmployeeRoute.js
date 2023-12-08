import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

//   router.post('/add_remittance', (req, res) => {
//     const sql = `INSERT INTO remittance_slip 
//     (trip_no, date_time, p_1000s, p_500s, p_200s, p_100s, p_50s, p_20s, p_10s, p_5s, p_1s, p_0_25s, p_TOTAL) 
//     VALUES ( ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//         req.body.trip_no,
//         req.body.date_time,
//         req.body.p_1000s,
//         req.body.p_500s,
//         req.body.p_200s,
//         req.body.p_100s,
//         req.body.p_50s,
//         req.body.p_20s,
//         req.body.p_10s,
//         req.body.p_5s,
//         req.body.p_1s,
//         req.body.p_0_25s,
//     ];

//     con.query(sql, values, (err, result) => {
//         if (err) {
//             return res.json({ Status: false, Error: err });
//         }
//         return res.json({ Status: true });
//     });
// });

router.post('/add_remittance', (req, res) => {
  const sql = `
      INSERT INTO remittance_slip 
      (jeep_id, trip_no, date_time, p_1000s, p_500s, p_200s, p_100s, p_50s, p_20s, p_10s, p_5s, p_1s, p_0_25s) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
      req.body.jeep_id,
      req.body.trip_no,
      req.body.date_time,
      req.body.p_1000s,
      req.body.p_500s,
      req.body.p_200s,
      req.body.p_100s,
      req.body.p_50s,
      req.body.p_20s,
      req.body.p_10s,
      req.body.p_5s,
      req.body.p_1s,
      req.body.p_0_25s,
  ];

  con.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error adding remittance:', err);
          return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
      }

      return res.status(200).json({ Status: true });
  });
});


// Assuming you have a route for fetching jeepneys data
router.get('/jeepneys', (req, res) => {
  const sql = "SELECT * FROM jeepneys";
  con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});

router.get('/employee', (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})


  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as EmployeeRouter}