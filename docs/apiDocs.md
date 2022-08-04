# API DOCUMENTATION

The apis are available on :

https://shrouded-plains-45196.herokuapp.com

## Books (/api/books)

- ### GET

  #### /

        Response
            Code: 200
            payload:
                [{
                    "url": string,
                    "name": string,
                    "authors": [ string ],
                    "commentCount": int,
                    "released": dateTime,
                    "id": id
                }]

  #### /:id

         Response
            Code: 200
            payload:
                {
                    "url": string,
                    "name": string,
                    "authors": [ string ],
                    "commentCount": int,
                    "released": dateTime,
                    "id": id
                }

  #### /:id/comments

        Response
            Code: 200
            payload:
                [{
                    "id": id,
                    "bookId": int,
                    "createdAt": dateTime,
                    "ipAddress": string,
                    "content": string
                }]

## Characters (/api/characters)

- ### GET

  #### /

        Request
            parameters:
            {
                sortBy: age, gender, name,
                OrderBy: desc, asc,
                gender: male, female
            }
        Response
            Code: 200
            payload:
                [{
                    "url": string,
                    "name": string,
                    "authors": [ string ],
                    "commentCount": int,
                    "released": dateTime,
                    "id": id
                }]

## Comments (/api/comments)

- ### GET

  #### /

        Response
            Code: 200
            payload:
                [{
                    "id": id,
                    "bookId": int,
                    "createdAt": dateTime,
                    "ipAddress": string,
                    "content": string
                }]

- ### POST

  #### /

        Request
            body:
            {
              "bookId": int,
              "content": string
            }
        Response
            Code: 200
            payload:
                {
                    "id": id,
                    "bookId": int,
                    "createdAt": dateTime,
                    "ipAddress": string,
                    "content": string
                }
