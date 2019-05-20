# Description

**Pitch**
As an artist, I want to be able to show off my work. I'm a photographer and I have a lot of amazing foodie pics I'd like to share with potential clients, but I need a site that is more professional than Instagram in order to do so.

**MVP**

- Users can visit site and see artists photos laid out in a grid.
- Artists can create, read, update photo (descriptions). No ability to upload one's own photos.

**MVP Features Breakdown**

This app contains two user types:

- an artist (who has the ability to login) and
- a single user (no need to login, so no need to persist user data) who can view an artist's portfolio

- Home page
  - Anyone can visit the site and view artists photos laid out in a grid
- Login Page
  - This is where an artist can login
  - After login, they'll be directed to their portfolio page where they can create a "post"
  - Each post needs to have an image, description and and upvote section (think instagram for artists)
- Create Post Page
  - Allows an artist to create a post of their artwork (no need to upload photos for MVP)
  - **Stretch goal**. Build an image uploader into the site that allows users to upload their own assets. (This will require some work with a package called Drop Zone and a service called Cloudinary).
- Edit Post Page
  - An artist can edit their post descriptions
- Navigation
  - Navigation is present on all pages
  - Users should know what page is active by clicking on a nav link and activating their tab

# Endpoints

Base URL:

## Authentication

| Method | Endpoint  | Access | Required Data                      |
| :----- | :-------- | :----- | :--------------------------------- |
| POST   | `/signup` | anyone | first & last name, email, password |
| POST   | `/login`  | artist | email, password                    |

`POST /signup` and `POST \login` returns an object, in which the `photos` key is an array of length 10:

```
{
    msg: A welcome message,
    token: Token must be stored in local storage,
    artistId: Artist ID,
    fname: Artist's first name,
    lname: Artist's last name,
    email: Artist's email,
    avatar: Artist's avatar image to be used in `<img src>`,
    photos: [
                {
                    photoId: Photo ID,
                    src: `<img src>`,
                    description: Photo description, if available. Otherwise, it's an empty string,
                    alt: `<img alt>`,
                    likes: Number of likes,
                    createdAt: Timestamp of when the photo was taken
                }, ...
            ]
}
```

## Photo

| Method | Endpoint              | Access | Required Data |
| :----- | :-------------------- | :----- | :------------ |
| GET    | `/`                   | anyone | None          |
| PUT    | `/:artistId/:photoId` | artist | description   |

`GET /` returns an array of objects with length at least 30:

```
[
    {
        fname: Artist's first name,
        lname: Artist's last name,
        email: Artist's email,
        avatar: Artist's avatar image to be used in `<img src>`,
        src: Photo to be used in `<img src>`,
        description: Photo description, if available. Otherwise, it's an empty string,
        alt: Photo's alternate text to be used in `<img alt>`,
        likes: Number of likes,
        createdAt: Timestamp of when the photo was taken
    }, ...
]
```

Stretch:

- An artist can delete their own photos
- An artist can delete their account
