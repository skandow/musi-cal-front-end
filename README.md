# Welcome to Musi-Cal!

This SPA is designed for freelance musicians to be able to create and organize
rehearsals, performances, and other events for which they are a part. Users have the
ability to also create music ensembles and add other users to them as designated 
members of said ensemble.

Musi-Cal allows individuals to create accounts providing the following data:

# User Data: 
  1.  Name
  2.  Password
  3.  Email address (the identifying component of each account)
  4.  Phone Number
  5.  Primary Instrument or Voice Part
  6.  Secondary Instrument    
  7.  Image url  

# Menu Highlights:

Musi-Cal utilizes a menu NavBar that allows users to accomplish the following:

  1.  View a user's profile
  2.  Edit a user's profile (the profile can also be deleted on this page)
  3.  View a user's events for all music ensembles of which they are a part
  4.  View a user's ensembles of which they are a part
  5.  View all ensembles of which the user has administrative privileges 
  6.  A 'log-out' button

# Profile Highlights:

User profiles contain the following

  1.  User picture and information
  2.  Notification of how many future events the user can confirm attendance for
  3.  A calendar that contains all the user's future events
  4.  A list of the user's next three events 

# Administrative Highlights:

When a user creates a music ensemble, that user automatically is given administrative
privileges related to the management of that ensemble on Musi-Cal. This bestows the
user with the following abilities:

  1.  Edit details for the music ensemble
        Music Ensemble profiles are created with the following information
            -Name
            -Email contact
            -Phone number
            -Website
            -Description
            -Image url
        Music ensembles also have events pages, highlighting the events that are unique
        to that ensemble. This page is viewable by all members of an ensemble.
  2.  View the list of members for each music ensemble
            -Admins can add new members to an ensemble by utilizing the email address of the user
            as registered on Musi-Cal. There is a search feature that allows admins to look for a 
            particular member by name or email address.
            -Admins can also define the performing and administrative roles for members in an ensemble and can also bestow administrative privileges for members either upon creation or during edits.
            -Admins can email all the members of a particular music ensemble.
            -Admins can delete a member from a music ensemble.
  3.  Create, edit, and delete events for a particular ensemble.
        Events are created with the following information
            -Title
            -Start Time
            -End Time
            -Location (determined using Google Places library autocomplete feature and rendered on 
            an events page using the Google Maps API)
            -Description
            -Mandatory status
        In addition, admins also have the ability to take attendance for an event past, present,
            or future, and can see whether a member plans to attend the event or not. 

# Visit The Site!:
  1.  This site is live! Visit https://musi-cal-front-end.herokuapp.com/
  2.  To view the back end repo for this app, go to https://github.com/skandow/musi-cal-back-end