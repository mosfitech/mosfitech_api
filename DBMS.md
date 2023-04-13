# DBMS

```
<!-- partner -->
  _id: {
    type: String,
    required: true
  },
  business_name: {
    type: String,
    required: true,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  owner_username: {
    type: String,
    required: true,
    max: 255,
  },
  latitude_shelter: {
    type: String,
    require: true,
  },
  longitude_shelter: {
    type: String,
    require: true,
  },
  radius_rental: {
    type: Number,
    require: true,
  },
  state_shelter: {
    type: String,
  },
  added_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
```

```
<!-- // kit -->
{
 _id: {
    type: String,
  },
  owner_email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    max: 255,
  },
  type: {
    type: String,
    required: true,
    max: 255,
  },
  rental_status: {
    type: Number,
    required: true,
  },
  warning_staus: {
    type: Number,
    required: true,
  },
  battray: {
    type: Number,
    required: true,
  },
  rental_time: {
    type: Number,
    required: true,
  },
  latitude_kit: {
    type: String,
    require: true,
  },
  longitude_kit: {
    type: String,
    require: true,
  },
  latest_rent_username: {
    type: String,
    required: true,
    max: 255,
  },
  latest_rent_email: {
    type: String,
    required: true,
    max: 255,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
}
```
