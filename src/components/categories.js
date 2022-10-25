import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index'
import { useNavigate } from "react-router-dom";
import '../styles/category.css';
import {Container, Row , Col } from 'react-grid';

const Categories = () => {
    const [Category, setCat] = useState('');
    const [Description, setDescription] = useState('');

    const categories = [
        { Category: "Software Design", Description: "Questions related to Software Design, Design Patterns, Architectures Styles, UML Diagrams, Testing, etc." },
        { Category: "Software Design Project", Description: "Questions related to Agile Methodology(Scrum), Javascript, Datebase Tools, HTML/CSS, etc." },
        { Category: "Advanced Analysis of Algorithms", Description: "Questions related to Algorithms, Dynamic Programming, Sort/Search/Greedy Algorithms, Complexities(Big O notation, proofs), Artificial Intelligence, Computational Geometry, etc." },
        { Category: "Parallel Computing", Description: "Questions related to Parallel Systems, APIs(OpenMP, MPI), parallelised algorithms, etc." },
        { Category: "Operating Systems", Description: "Questions related to Operating Systems, Types(Linux, iOS, Android, etc.), their Purpose/Fuctionality, Processing, Threads, Packaging, Scheduling, etc." },
        { Category: "Computer Graphics and Visualization", Description: "Questions related to Computer Graphics, Pixels, Rasterization, Rendering Scenes, Animation,Visulization(Lighting, Material, etc.), Computational Geometry, APIs(OpenGL, WebGL, etc.), Modelling(Scene Objects ~ Hierarchical/Sub-routine/Scene Graphs etc.), etc." },
        { Category: "Machine Learning", Description: "Questions related to machine learning, Neural Networks, Creation/Training Models, Collecting/Manipulation of Data, Classification vs Regression, Methods(e.g., Naive Bayes, Decision Trees, etc.), Reinforcement Learning(AI)" },
        { Category: "Formal Languages and Automata", Description: "Questions related to Fundamental Theory of Computer Science and Computation, Turing Machines, Finite/Push-Down Automata, diffrent types of languages(e.g., regular, context-free, etc.), proofs, etc." }
    ]

    return (
        <div className="categories">
            <h2 className='category'>Category</h2>
            <div className='col'>
            {categories.map((cat) => (
                <Container >
                <Row>
                  <Col>
                    <div  className='categoryBox'>
                  <h2 style={{marginTop:'20px', textTransform:'uppercase'}}>{cat.Category}:</h2>
                    <hr className="linedivider" />
                    <p>Description - {cat.Description} </p>
                    <br/>
                    </div>
                  </Col>
                </Row>
              </Container>
            ))}
            </div>
        </div>
    )
}

export default Categories;