const express = require("express")
const app = express()
const cors = require("cors")

const { intializeDatabase } = require("./db/db.connect")
const Hotels = require("./models/hotels.models")
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())

intializeDatabase()

app.get("/", (req, res) => {
    res.send("Welcome to Hotels Backend Management!!")
})

async function createHotel(newHotel) {
    try {
        const hotel = new Hotels(newHotel)
        const saveHotel = await hotel.save()
        return saveHotel        
    } catch (error) {
        throw error
    }
} 

app.post("/hotels", async (req, res) => {
    try {
        const savedHotel = await createHotel(req.body)
        res.status(201).json({message: "Hotel added successfully.", hotel: savedHotel})
    } catch (error) {
        res.status(500).json({error: "Failed to add hotel."})
    }
})

async function readAllHotels() {
    try {
        const readAllHotel = await Hotels.find()
        return readAllHotel
    } catch (error) {
        throw error
    }
}

app.get("/hotels", async (req, res) => {
    try {
        const hotel = await readAllHotels(req.params.hotels)
        if (hotel.length != 0) {
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotel data."})   
    }
})

async function readByName(hotelName) {
    try {
        const readName = await Hotels.findOne({name: hotelName})
        return readName
    } catch (error) {
        throw error
    }
}

app.get("/hotels/:hotelName", async (req, res) => {
    try {
        const hotel = await readByName(req.params.hotelName)
        if (hotel.length != 0) {
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotel data."})
    }
})

async function readByParking(isParking) {
    try {
        const parking = await Hotels.find({isParkingAvailable: isParking})
        console.log(parking)
    } catch (error) {
        throw error
    }
}

// readByParking(true)

async function readByRestaurant(isRestaurant) {
    try {
        const restaurant = await Hotels.find({isRestaurantAvailable: isRestaurant})
        console.log(restaurant)
    } catch (error) {
        throw error
    }
}

// readByRestaurant(true)

async function readByCategory(categoryName) {
    try {
        const readCategory = await Hotels.find({category: categoryName})
        return readCategory
    } catch (error) {
        throw error
    }
}

app.get("/hotels/category/:categoryName", async (req, res) => {
    try {
        const hot = await readByCategory(req.params.categoryName)
        if (hot.length != 0) {
            res.json(hot)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotel data."})
    }
})

async function readByPrice(price) {
    try {
        const readPrice = await Hotels.findOne({priceRange: price})
        console.log(readPrice)
    } catch (error) {
        throw error
    }
}

// readByPrice("$$$$ (61+)")

async function readByRating(rate) {
    try {
        const readRating = await Hotels.find({rating: rate})
        return readRating
    } catch (error) {
        throw error
    }
}

app.get("/hotels/rating/:hotelRating", async (req, res) => {
    try {
        const hotel = await readByRating(req.params.hotelRating)
        if (hotel.length != 0) {
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetched hotel data."})
    }
})

async function readByPhonenumber(phoneNum) {
    try {
        const readPhoneNum = await Hotels.findOne({phoneNumber: phoneNum})
        return readPhoneNum      
    } catch (error) {
        throw error
    }
}

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
    try {
        const hotel = await readByPhonenumber(req.params.phoneNumber)
        if (hotel.length != 0) {
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotel data."})
    }
})

async function deleteHotelById(hotelID) {
    try {
        const hotelDelete = await Hotels.findByIdAndDelete(hotelID)
        return hotelDelete
    } catch (error) {
        throw error
    }
}

app.delete("/hotels/:hotelId", async (req, res) => {
    try {
        const deletedHotel = await deleteHotelById(req.params.hotelId)
        if(deletedHotel) {
            res.status(201).json({message: "Hotel delteted successfully."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete hotel."})
    }
})

async function updateHotelRatingById(hotelId, updateToData) {
    try {
        const updateHotel= await Hotels.findByIdAndUpdate(hotelId, updateToData, {new: true})
        return updateHotel
    } catch (error) {
        console.log(error);
    }
}

app.post("/hotels/:hotelId", async (req, res) => {
    try {
        const updatedHotelRating = await updateHotelRatingById(req.params.hotelId, req.body)
        if (updatedHotelRating) {
            res.status(201).json({message: "Hotel data updated successfully.", hotelRating: updatedHotelRating})
        } else {
            res.status(404).json({erro: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update hotel data."})
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);   
})