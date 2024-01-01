'use client'
import React from 'react'
import { Button } from './ui/Button'
import Icons from './Icons'
import { toast } from './ui/Toast'

type Props = {}

const ShareUrlButton = (props: Props) => {

    const getCurrentUrl = (): string => {
        return window.location.href;
      };
    
      const share = async () => {
        const url = getCurrentUrl();
    
        try {
          await navigator.clipboard.writeText(url);
          toast({
            title: 'URL copied to clipboard',
            message: 'Share this link',
            type: 'success',
          });
        } catch (error) {
          console.error('Failed to copy URL to clipboard', error);
          toast({
            title: 'Failed to copy URL',
            message: 'Please try again',
            type: 'error',
          });
        }
      };
    
    toast({
        title: "URL copied to clipboard",
        message: "Share this link",
        type: "success",
    });

  return (
    <Button onClick={share} variant={"outline"}><Icons.Share2 className="mr-2 h-4 w-4" /> Share</Button>
  )
}

export default ShareUrlButton