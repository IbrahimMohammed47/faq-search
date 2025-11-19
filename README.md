
# FAQ Search Application

This is a simple FAQ search application that allows users to search for frequently asked questions.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd <project-directory>
   ```
3. **Install dependencies and run full project in dev mode:**
   ```bash
   npm i && npm run dev
   ```


## API Endpoints

### `POST /api/search`

- **Description:** Retrieves a list of all FAQs.
- **Query Parameters:**
  - `search` (required): A string to filter FAQs by title and description.
- **Example Usage:**
  ```
  curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "trust badges"}'
  ```

## Assumptions

- the search does insensitive strict matching between all query terms and all faqs terms
- partial string matching for each term is not supported
- returned documents must have at least 1 match
- returned documents are sorted such that document with most term matches are on top 
