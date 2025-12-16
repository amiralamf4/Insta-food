import React from 'react'
import { Link } from 'react-router-dom'

const FoodDetails = ({ name, description, foodPartner }) => {
    return (
        <div className="absolute bottom-0 w-106 h-56 py-1 px-4 flex flex-col">

            <h2 className="text-lg font-bold">{name}</h2>

            <p className="text-sm text-gray-300 h-18 pt-1">
                {description}
            </p>

            {foodPartner && (
                <Link
                    to={`/food-partner/${foodPartner}`}
                    className="bg-orange-600 text-sm px-4 py-3 rounded-xl mt-1 w-28 hover:bg-orange-500"
                >
                    Visit Store
                </Link>
            )}

        </div>
    )
}

export default FoodDetails