import styled from 'styled-components'

export const BoxUpload = styled.div`
    display: grid;
    margin-top: 0px;
    place-items: center;
    border: 1px dashed #A9C47F;
    /* padding: 36px 48px; */
    position: relative;
    height: 280px;
    width: 280px;
    background: #FBFBFF;
    border-radius: 20px;
    .image-upload {
        display: flex;
        flex-wrap:wrap;
        label {
            cursor: pointer;
        
            :hover {
                opacity: .8;
            }
        }
        >input {
            display: none;
        }
    }
`

export const ImagePreview = styled.div`
    position: relative;
    /* cursor: pointer; */
    #uploaded-image{
        height: 350px;
        width: 350px;
        object-fit: cover;
        border-radius: 20px;
    }
    .close-icon{
        background: #000;
        border-radius: 5px;
        opacity: .8;
        position: absolute;
        z-index: 10;
        right: 15px;
        top: 20px;
        cursor: pointer;
        :hover {
            opacity: 1;
        }   
    }
`