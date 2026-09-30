---
title: "Database Relationships: 1:1, 1:N, and N:M"
description: Master relational data modeling across One-to-One, One-to-Many, and Many-to-Many relationships using foreign keys and junction tables.
category: database
topic: database-fundamentals
type: concept
level: beginner
tags:
  - database
  - sql
  - relationships
  - modeling
  - junction-tables
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## Overview

Relational databases structure data by connecting distinct entities together. There are three fundamental cardinality patterns:

1. **One-to-One (1:1)**
2. **One-to-Many (1:N)**
3. **Many-to-Many (N:M)**

---

## 1. One-to-One (1:1)

A record in Table A relates to at most one record in Table B (e.g. a `User` has one `UserProfile`).

### Implementation
Place a foreign key in Table B with a **`UNIQUE`** constraint on that column:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    avatar_url VARCHAR(255)
);
```

---

## 2. One-to-Many (1:N)

A single record in Table A relates to multiple records in Table B, but each record in Table B belongs to only one record in Table A (e.g. an `Author` has many `Articles`).

### Implementation
Place a foreign key in the child table ("Many" side):

```sql
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL
);
```

---

## 3. Many-to-Many (N:M)

Multiple records in Table A relate to multiple records in Table B (e.g. a `Student` enrolls in many `Courses`, and a `Course` has many `Students`).

### Implementation
Relational databases cannot model Many-to-Many directly between two tables. You must introduce a **Junction Table** (also called a **Bridge** or **Pivot Table**) containing foreign keys to both tables:

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL
);

-- Junction Table
CREATE TABLE enrollments (
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id)
);
```
