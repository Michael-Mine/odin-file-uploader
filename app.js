require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

const expressSession = require("express-session");
const passport = require("passport");

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("./generated/prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const shareRouter = require("./routes/shareRouter");
const fileRouter = require("./routes/fileRouter");
const folderRouter = require("./routes/folderRouter");
const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // 2 mins
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.session());

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/share", shareRouter);
app.use("/file", fileRouter);
app.use("/folder", folderRouter);
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
