import React, { useRef, useState, useCallback } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'



const MAX_SIZE = 50 * 1024 * 1024 // 50MB

const CreateFood = () => {
  const fileRef = useRef(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState(null)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [saving, setSaving] = useState(false)
 
  const navigate=useNavigate()

  const clearVideo = useCallback(() => {
    if (video?.url) URL.revokeObjectURL(video.url)
    setVideo(null)
  }, [video])

  function handleFile(f) {
    setError('')
    if (!f) return
    if (!f.type.startsWith('video/')) {
      setError('Please select a valid video file.')
      return
    }
    if (f.size > MAX_SIZE) {
      setError('File is too large. Max size is 50MB.')
      return
    }

    clearVideo()
    const item = { file: f, url: URL.createObjectURL(f), id: Math.random().toString(36).slice(2) }
    setVideo(item)
  }

  function onFilesSelected(e) {
    const f = e.target.files?.[0]
    handleFile(f)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragActive(false)
    const f = e.dataTransfer?.files?.[0]
    handleFile(f)
  }

  function onDragOver(e) {
    e.preventDefault()
    setDragActive(true)
  }

  function onDragLeave() {
    setDragActive(false)
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
   
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    if (video?.file) formData.append('video', video.file)

      const res= await axios.post('http://localhost:3000/api/food/', formData, {
        withCredentials: true,})

        console.log(res);
        navigate(`/food-partner/${res.data.food.foodPartner}`)
  }

  return (
    <div className="p-4 w-full h-screen flex justify-around items-center bg-gray-900">
      <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-700">
          <h1 className="text-lg font-semibold text-slate-100">Create Post</h1>
          <p className="text-sm text-slate-400">Share a short video and details about your dish.</p>
        </div>

        <form onSubmit={onSubmit} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Video upload & preview */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-200 mb-3">Video</label>

            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`rounded-lg border-2 ${dragActive ? 'border-emerald-500 ring-2 ring-emerald-400/20' : 'border-slate-700'} bg-slate-900 overflow-hidden`}
            >
              {!video ? (
                <div className="p-6 flex flex-col items-center justify-center gap-4">
                  <div className="w-full text-center">
                    <p className="text-sm text-slate-300">Drag & drop a short video here, or</p>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
                      >
                        Choose Video
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">Accepted: mp4, webm • Max 50MB • 5–30s recommended</div>
                </div>
              ) : (
                <div className="relative h-48 w-full bg-black">
                  <video src={video.url} className="object-cover w-full h-full" controls playsInline />
                  <button
                    type="button"
                    onClick={() => clearVideo()}
                    className="absolute top-3 right-3 bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center"
                    aria-label="Remove video"
                  >
                    ×
                  </button>
                </div>
              )}

              <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={onFilesSelected} />
            </div>

            {error && <div className="mt-3 text-sm text-rose-400">{error}</div>}
          </div>

          {/* Right: Inputs */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="E.g. Butter Chicken"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 min-h-[120px] resize-vertical focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Short description, ingredients, serving size..."
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setName('')
                    setDescription('')
                    clearVideo()
                    setError('')
                  }}
                  className="px-4 py-2 rounded-md bg-slate-700 text-slate-200 border border-slate-600"
                >
                  Reset
                </button>
 
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-4 py-2 rounded-md bg-emerald-600 text-white ${saving ? 'opacity-70' : 'hover:bg-emerald-500'}`}
                >
                  {saving ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood