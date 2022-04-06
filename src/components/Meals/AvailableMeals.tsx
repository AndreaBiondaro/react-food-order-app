import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import Meal from '../../models/Meal';

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

const AvaibleMeals = () => {
    const [meals, setMeals] = useState<Array<Meal>>([]);
    const [loading, setLoading] = useState(true);
    const [httpError, setHttpError] = useState('');

    // This hook is called only once, as the dependency array is empty
    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('http://localhost:3002/api/data');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const json = await response.json();

            setMeals(json);
            setLoading(false);
        }

        fetchMeals().catch((error) => {
            console.error(error);
            setHttpError(error.message);
        });
    }, []);

    if (loading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {
                        meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
                    }
                </ul>
            </Card>
        </section>
    );
};

export default AvaibleMeals;
