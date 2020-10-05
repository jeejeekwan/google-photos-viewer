import React, { useState, useEffect, useContext } from 'react'
import './AlbumsList.scss'
import { Link } from 'react-router-dom'
import PhotoServiceContext from './PhotoServiceContext'
import HeaderBreadcrumb from './HeaderBreadcrumb'

function AlbumsList () {
  const service = useContext(PhotoServiceContext) // new GooglePhotosService();
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // useEffect only runs once to get the promise data initially.
  useEffect(function () {
    const promise = service.loadAlbums()
    promise.then(function (arg) {
      setAlbums(arg)
      setIsLoading(false)
    })
  },
  []
  )

  const newAlbums = albums.map( function (obj){
    return (
      <li key={obj.id}>
        <Link to={'/album/' + obj.id}>
          <figure>
            <img src={obj.coverPhotoBaseUrl} />            
            <figcaption>
              <h3>
                { obj.title }
              </h3>
            </figcaption>
          </figure>
        </Link>
        <br />
      </li>
    );
  })

  return (
    <div>
      { isLoading && 'Loading...' }
      { albums.length > 0 &&
        <div>
          <HeaderBreadcrumb />
          
          <ul className="albums">
            { newAlbums }
          </ul>
        </div>
      }

      <hr />
      <Link to='/'>Back to Albums List</Link>
    </div>
  );
}

export default AlbumsList
