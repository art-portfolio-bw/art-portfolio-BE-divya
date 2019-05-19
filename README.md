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
  - Each post needs to have an image, description and and upvote section to it (think instagram for artists)
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
| Method | Endpoint  | Access | Requirements          | Returns                                  |
| :---   | :---      | :---   | :---                  | :---                                     |
| POST   | `/signup` | anyone | name, email, password | A token, must be stored in local storage |
| POST   | `/login`  | artist | email, password       | A token, must be stored in local storage |

## Photo
| Method | Endpoint              | Access  | Requirements  |
| :---   | :---                  | :---    | :---:         |
| GET    |  `/`                  | anyone  | None          |
| PUT    | `/:artistId/:photoId` | artist  | description   |


Stretch:
- An artist can delete their own photos
- An artist can delete their account
